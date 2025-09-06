const Datastore = require('nedb-promises');
const path = require('path');

const users = Datastore.create({
  filename: path.join(__dirname, 'database', 'users.db'),
  autoload: true,
  timestampData: true,
});
const products = Datastore.create({
  filename: path.join(__dirname, 'database', 'products.db'),
  autoload: true,
  timestampData: true,
});
const cart = Datastore.create({
  filename: path.join(__dirname, 'database', 'cart.db'),
  autoload: true,
  timestampData: true,
});
const orders = Datastore.create({
  filename: path.join(__dirname, 'database', 'orders.db'),
  autoload: true,
  timestampData: true,
});
const orderItems = Datastore.create({
  filename: path.join(__dirname, 'database', 'orderItems.db'),
  autoload: true,
  timestampData: true,
});

async function initIndexes() {
  await users.ensureIndex({ fieldName: 'email', unique: true, sparse: false });
  await products.ensureIndex({ fieldName: 'title' });
  await products.ensureIndex({ fieldName: 'category' });
  await cart.ensureIndex({ fieldName: 'userId' });
  await orders.ensureIndex({ fieldName: 'userId' });
  await orderItems.ensureIndex({ fieldName: 'orderId' });
}

module.exports = { users, products, cart, orders, orderItems, initIndexes };
