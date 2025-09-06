require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { users, products, cart, orders, orderItems, initIndexes } = require('./db');
const { authRequired } = require('./middleware.auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

initIndexes();

const PLACEHOLDER_IMG = 'https://via.placeholder.com/600x400?text=EcoFinds';

// ---------- AUTH ----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const hash = await bcrypt.hash(password, 10);
    const user = await users.insert({ email: email.toLowerCase(), passwordHash: hash, username: username || email.split('@')[0], avatarUrl: '', });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, username: user.username, avatarUrl: user.avatarUrl } });
  } catch (err) {
    if (String(err).includes('unique')) return res.status(409).json({ error: 'Email already registered' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email: (email||'').toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, username: user.username, avatarUrl: user.avatarUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/me', authRequired, async (req, res) => {
  const user = await users.findOne({ _id: req.user.id });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user._id, email: user.email, username: user.username, avatarUrl: user.avatarUrl });
});

app.put('/api/me', authRequired, async (req, res) => {
  const { username, avatarUrl } = req.body;
  const user = await users.update({ _id: req.user.id }, { $set: { username, avatarUrl } }, { returnUpdatedDocs: true });
  res.json({ id: user._id, email: user.email, username: user.username, avatarUrl: user.avatarUrl });
});

// ---------- PRODUCTS ----------
app.get('/api/products', async (req, res) => {
  const { search = '', category = '' } = req.query;
  const all = await products.find({});
  const q = search.trim().toLowerCase();
  const filtered = all.filter(p => {
    const matchesSearch = !q || (p.title||'').toLowerCase().includes(q);
    const matchesCat = !category || (p.category === category);
    return matchesSearch && matchesCat;
  }).sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
  res.json(filtered);
});

app.get('/api/products/:id', async (req, res) => {
  const p = await products.findOne({ _id: req.params.id });
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.get('/api/my/listings', authRequired, async (req, res) => {
  const list = await products.find({ sellerId: req.user.id });
  res.json(list.sort((a,b)=> new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)));
});

app.post('/api/products', authRequired, async (req, res) => {
  const { title, description, category, price, imageUrl } = req.body;
  if (!title || !category || price == null) return res.status(400).json({ error: 'title, category, price required' });
  const product = await products.insert({
    title, description: description || '', category, price: Number(price),
    imageUrl: imageUrl || PLACEHOLDER_IMG,
    sellerId: req.user.id
  });
  res.status(201).json(product);
});

app.put('/api/products/:id', authRequired, async (req, res) => {
  const p = await products.findOne({ _id: req.params.id });
  if (!p) return res.status(404).json({ error: 'Not found' });
  if (p.sellerId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
  const { title, description, category, price, imageUrl } = req.body;
  const updated = await products.update({ _id: p._id }, { $set: { title, description, category, price: Number(price), imageUrl } }, { returnUpdatedDocs: true });
  res.json(updated);
});

app.delete('/api/products/:id', authRequired, async (req, res) => {
  const p = await products.findOne({ _id: req.params.id });
  if (!p) return res.status(404).json({ error: 'Not found' });
  if (p.sellerId !== req.user.id) return res.status(403).json({ error: 'Not owner' });
  await products.remove({ _id: p._id }, {});
  res.json({ ok: true });
});

// ---------- CART ----------
app.get('/api/cart', authRequired, async (req, res) => {
  const items = await cart.find({ userId: req.user.id });
  // Hydrate with product info
  const productIds = items.map(i => i.productId);
  const prods = await products.find({ _id: { $in: productIds } });
  const byId = Object.fromEntries(prods.map(p => [p._id, p]));
  const detailed = items.map(i => ({
    ...i,
    product: byId[i.productId] || null
  }));
  res.json(detailed);
});

app.post('/api/cart', authRequired, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const p = await products.findOne({ _id: productId });
  if (!p) return res.status(404).json({ error: 'Product not found' });
  const existing = await cart.findOne({ userId: req.user.id, productId });
  if (existing) {
    const updated = await cart.update({ _id: existing._id }, { $set: { quantity: Number(existing.quantity || 1) + Number(quantity) } }, { returnUpdatedDocs: true });
    return res.json(updated);
  }
  const item = await cart.insert({ userId: req.user.id, productId, quantity: Number(quantity) });
  res.status(201).json(item);
});

app.put('/api/cart/:id', authRequired, async (req, res) => {
  const { quantity } = req.body;
  const item = await cart.findOne({ _id: req.params.id });
  if (!item || item.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  const updated = await cart.update({ _id: item._id }, { $set: { quantity: Number(quantity) } }, { returnUpdatedDocs: true });
  res.json(updated);
});

app.delete('/api/cart/:id', authRequired, async (req, res) => {
  const item = await cart.findOne({ _id: req.params.id });
  if (!item || item.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  await cart.remove({ _id: item._id }, {});
  res.json({ ok: true });
});

app.post('/api/cart/checkout', authRequired, async (req, res) => {
  const items = await cart.find({ userId: req.user.id });
  if (items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  const order = await orders.insert({ userId: req.user.id, createdAt: new Date().toISOString() });
  for (const it of items) {
    const p = await products.findOne({ _id: it.productId });
    if (!p) continue;
    await orderItems.insert({
      orderId: order._id,
      productId: p._id,
      quantity: Number(it.quantity || 1),
      priceAtPurchase: Number(p.price)
    });
  }
  await cart.remove({ userId: req.user.id }, { multi: true });
  res.json({ ok: true, orderId: order._id });
});

// ---------- ORDERS ----------
app.get('/api/orders', authRequired, async (req, res) => {
  const list = await orders.find({ userId: req.user.id });
  // attach items & product info
  const result = [];
  for (const ord of list) {
    const items = await orderItems.find({ orderId: ord._id });
    const prodIds = items.map(i => i.productId);
    const prods = await products.find({ _id: { $in: prodIds } });
    const byId = Object.fromEntries(prods.map(p => [p._id, p]));
    result.push({ ...ord, items: items.map(i => ({ ...i, product: byId[i.productId] || null })) });
  }
  res.json(result.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
});

app.get('/api/orders/:id', authRequired, async (req, res) => {
  const ord = await orders.findOne({ _id: req.params.id });
  if (!ord || ord.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  const items = await orderItems.find({ orderId: ord._id });
  const prodIds = items.map(i => i.productId);
  const prods = await products.find({ _id: { $in: prodIds } });
  const byId = Object.fromEntries(prods.map(p => [p._id, p]));
  res.json({ ...ord, items: items.map(i => ({ ...i, product: byId[i.productId] || null })) });
});

// ---------- HEALTH ----------
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`EcoFinds server listening on http://localhost:${PORT}`);
});
