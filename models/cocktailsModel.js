const connection = require('../db-config');

const db = connection.promise();

const findAllCocktails= () => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM cocktails cktl
  JOIN users usr ON cktl.userId = usr.id 
  JOIN categories c ON cktl.categoryId = c.id`);

const findOneCocktail = (id) => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM cocktails cktl
  JOIN users usr ON cktl.userId = usr.id 
  JOIN categories c ON cktl.categoryId = c.id 
  WHERE cktl.id = ?`, [id]);

const findAllByCocktail = (id) => db.query(`SELECT cktl.*, usr.name AS ListName, i.name AS ingredient FROM lists cktl
  JOIN cocktails usr ON cktl.cocktailId = usr.id 
  JOIN ingredients i ON cktl.ingredientId = i.id
  WHERE usr.id = ?`, [id]);

const postCocktail = ({
  name,
  image,
  description,
  categoryId,
  userId,
}) => db.query(
  'INSERT INTO cocktails (name, image, description, categoryId, userId) VALUES (?, ?, ?, ?, ?)',
  [
    name,
    image,
    description,
    categoryId,
    userId,
  ],
);

const putCocktail = (id, validCocktail) => db.query('UPDATE cocktails SET ? WHERE id = ?', [validCocktail, id]);

const deleteCocktail = (id) => db.query('DELETE FROM cocktails WHERE id = ?', [id]);

module.exports = {
  findAllCocktails,
  findOneCocktail,
  findAllByCocktail,
  postCocktail,
  putCocktail,
  deleteCocktail,
};
