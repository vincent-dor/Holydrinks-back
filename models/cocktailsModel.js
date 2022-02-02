const connection = require('../db-config');

const db = connection.promise();

const findAllCocktails= () => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM cocktails cktl 
  JOIN users usr ON cktl.userId = usr.id 
  JOIN categories c ON cktl.categoryId = c.id`);

const findAllByCategory = (name) => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM products pdt 
  JOIN users usr ON cktl.userId = usr.id 
  JOIN categories c ON cktl.categoryId = c.id 
  WHERE c.name = ?`, [name]);

const findOneCocktail = (id) => db.query(`SELECT cktl.*, usr.firstname AS userFirstName, usr.lastname AS userLastName, c.name AS category FROM products pdt 
JOIN users usr ON cktl.userId = usr.id 
JOIN categories c ON cktl.categoryId = c.id 
WHERE c.name = ?`, [id]);

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
  findAllByCategory,
  findOneCocktail,
  postCocktail,
  putCocktail,
  deleteCocktail,
};
