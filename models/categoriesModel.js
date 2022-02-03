const connection = require('../db-config');

const db = connection.promise();

const findAllCategories = () => db.query('SELECT * FROM categories');

const findAllByCategory = (id) => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM cocktails cktl
  JOIN users usr ON cktl.userId = usr.id 
  JOIN categories c ON cktl.categoryId = c.id 
  WHERE c.id = ?`, [id]);

const findOneCategory = (id) => db.query('SELECT * FROM categories WHERE id = ?', [id]);

const postCategory = ({ name }) => db.query('INSERT INTO categories (name) VALUES (?)', [name]);

const putCategory = (id, validUser) => db.query('UPDATE categories SET ? WHERE id = ?', [validUser, id]);

const deleteCategory = (id) => db.query('DELETE FROM categories WHERE id = ?', [id]);

module.exports = {
  findAllCategories,
  findOneCategory,
  findAllByCategory,
  postCategory,
  putCategory,
  deleteCategory,
};