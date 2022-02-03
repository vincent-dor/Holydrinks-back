const connection = require('../db-config');

const db = connection.promise();

const findUserByEmail = (email) => db.query('SELECT * FROM users WHERE email = ?', [email]);

const findAllUsers = ({ email }) => {
  let query = 'SELECT * FROM users';
  const params = [];
  if (email) {
    query += ' WHERE email = ?';
    params.push(email);
  }
  return db.query(query, params);
};

const findOneUser = (id) => db.query('SELECT * FROM users WHERE id = ?', [id]);

const postUser = (
  firstname,
  lastname,
  email,
  password,
  isAdmin,
  city,
) => {
  db.query(
    'INSERT INTO users (`firstname`, `lastname`, `email`, `password`, `isAdmin`, `city`) VALUES (?, ?, ?, ?, ?, ?)',
    [
      firstname,
      lastname,
      email,
      password,
      isAdmin,
      city,
    ],
  );
};

const putUser = (validUser, id) => db.query('UPDATE users SET ? WHERE id = ?', [validUser, id]);

const deleteUser = (id) => db.query('DELETE FROM users WHERE id = ?', [id]);

module.exports = {
  findAllUsers,
  findOneUser,
  postUser,
  putUser,
  deleteUser,
  findUserByEmail,
};