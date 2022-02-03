const cocktailsRouter = require('express').Router();
const Joi = require('joi');

const {
  findAllCocktails,
  findOneCocktail,
  findAllByCocktail,
  postCocktail,
  putCocktail,
  deleteCocktail,
} = require('../models/cocktailsModel');

const cocktailValidation = (isEdited = false) => {
  const presence = isEdited ? 'optional' : 'required';
  return Joi.object({
    name: Joi.string().max(200).presence('optional'),
    image: Joi.string().max(200).presence('optional'),
    description: Joi.string().max(355).presence('optional'),
    categoryId: Joi.number().presence('optional'),
    userId: Joi.number().presence('optional'),
  });
};

cocktailsRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllCocktails(req.query);

    if (!result.length) {
      return res.status(404).json({ message: 'No cocktails found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

cocktailsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneCocktail(id);
  return res.json(result);
});

cocktailsRouter.get('/:id/ingredients', async (req, res) => {
  const { id } = req.params;
  const [result] = await findAllByCocktail(id);
  return res.json(result);
});


cocktailsRouter.post('/', async (req, res) => {
  const { error, value: validCocktail } = cocktailValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [result] = await postCocktail(validCocktail);
    return res.status(201).json({ id: result.insertId, ...validCocktail });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the cocktail' });
  }
});

cocktailsRouter.put('/:id', async (req, res) => {
  const { error, value: validCocktail } = cocktailValidation(true).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneCocktail(id);
    if (!idResult.length) {
      return res.json({ message: `Cocktailnumber ${id} doesn't exist` });
    }
    putCocktail(id, validCocktail);
    return res.status(201).json({ id, ...validCocktail });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the cocktail' });
  }
});

cocktailsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [idResult] = await findOneCocktail(id);
    if (!idResult.length) {
      return res.json({ message: `Cocktail number ${id} doesn't exist` });
    }
    await deleteCocktail(id);
    return res.status(200).json({ message: `Cocktail ${id} deleted!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error deleting cocktail ${id}` });
  }
});

module.exports = cocktailsRouter;