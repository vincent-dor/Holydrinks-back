const connection = require('../db-config');

const db = connection.promise();

const findAllCategories = () => db.query('SELECT * FROM categories');

const findOneCategory = (id) => db.query('SELECT * FROM categories WHERE id = ?', [id]);

module.exports = {
  findAllCategories,
  findOneCategory,
};