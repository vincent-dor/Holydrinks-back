const usersRouter = require('express').Router();
const Joi = require('joi');
const argon2 = require('argon2');
const { generateJwt } = require('../utils/auth');

const {
  findUserByEmail,
  findAllUsers,
  findOneUser,
  postUser,
  putUser,
  deleteUser,
} = require('../models/usersModel');

const userValidation = Joi.object({
  firstname: Joi.string().max(200).required(),
  lastname: Joi.string().max(200).required(),
  email: Joi.string().max(200).required(),
  password: Joi.string().max(355).required(), 
  city: Joi.string().max(200).required(),
});

const userUpdate = Joi.object({
  firstname: Joi.string().max(200),
  lastname: Joi.string().max(200),
  email: Joi.string().max(200),
  password: Joi.string().max(355),
  city: Joi.string().max(200),
});

const loginValidation = Joi.object({
  email: Joi.string().max(200).required(),
  password: Joi.string().max(355).required(),
});

usersRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllUsers(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const [result] = await findOneUser(req.params.id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`An error occurred: ${err.message}`);
  }
});

usersRouter.post('/', async (req, res) => {
  const { value, error } = userValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[existingUser]] = await findUserByEmail(value.email);

  if (existingUser) {
    return res.status(409).json({
      message: 'User already exist',
    });
  }

  const hashedPassword = await argon2.hash(value.password);
  const isAdmin = false;

  await postUser(
    value.firstname,
    value.lastname,
    value.email,
    hashedPassword,
    isAdmin,
    value.city,
  );

  const jwtKey = generateJwt(value.email, isAdmin);
  return res.json({
    credential: jwtKey,
  });
});

usersRouter.put('/:id', async (req, res) => {
  const { error, value: validUser } = userUpdate.validate(req.body);
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }
  try {
    await putUser(validUser, id);
    return res.status(201).json({ id, ...validUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the user' });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneUser(id);
    if (!idResult.length) {
      return res.json({ message: `User number ${id} doesn't exist` });
    }
    await deleteUser(id);
    return res.status(200).json({ message: `User ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting user ${id}` });
  }
});

usersRouter.post('/login', async (req, res) => {
  const { value, error } = loginValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[existingUser]] = await findUserByEmail(value.email);

  if (!existingUser) {
    return res.status(403).json({
      message: 'Mauvais utilisateur ou mot de passe',
    });
  }

  const verified = await argon2.verify(existingUser.password, value.password);

  if (!verified) {
    console.log('argon2 verified fail');
    return res.status(403).json({
      message: 'Mauvais utilisateur ou mot de passe',
    });
  }

  const jwtKey = generateJwt(
    existingUser.email,
    existingUser.isAdmin,
  );

  return res.json({
    credential: jwtKey,
    id: existingUser.id,
    isAdmin: existingUser.isAdmin,
  });
});

module.exports = usersRouter;