const connection = require('../db-config');

const db = connection.promise();

const findAllIngredients = () => db.query('SELECT * FROM ingredients');

const findOneIngredient = (id) => db.query('SELECT * FROM ingredients WHERE id = ?', [id]);

module.exports = {
  findAllIngredients,
  findOneIngredient,
};