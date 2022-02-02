const connection = require('../db-config');

const db = connection.promise();

const findAllIngredients = () => db.query('SELECT * FROM ingredients');

const findOneIngredient = (id) => db.query('SELECT * FROM ingredients WHERE id = ?', [id]);

const postIngredient = ({ name }) => db.query('INSERT INTO ingredients (name) VALUES (?)', [name]);

const putIngredient = (id, validUser) => db.query('UPDATE ingredient SET ? WHERE id = ?', [validUser, id]);

module.exports = {
  findAllIngredients,
  findOneIngredient,
  postIngredient,
  putIngredient,
};