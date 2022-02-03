const ingredientsRouter = require('express').Router();

const {
  findAllIngredients,
  findOneIngredient,
  putIngredient,
  postIngredient,
} = require('../models/ingredientsModel');

ingredientsRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllIngredients();

    if (!result.length) {
      return res.status(404).json({ message: 'No ingredients found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

ingredientsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneIngredient(id);
  return res.json(result);
});

ingredientsRouter.post('/', async (req, res) => {
  const { error, value: validIngredient } = ingredientValidation().validate(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [result] = await postIngredient(validIngredient);
    return res.status(201).json({ id: result.insertId, ...validIngredient });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the Ingredient' });
  }
});

ingredientsRouter.put('/:id', async (req, res) => {
  const { error, value: validIngredient } = ingredientValidation(false).validate(
    req.body,
  );
  const { id } = req.params;

  if (error) {
    return res.status(422).json({ message: 'Invalid data', error });
  }

  try {
    const [idResult] = await findOneIngredient(id);
    if (!idResult.length) {
      return res.json({ message: `Ingredient number ${id} doesn't exist` });
    }
    putIngredient(id, validIngredient);
    return res.status(201).json({ id, ...validIngredient });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving the ingredient' });
  }
});

module.exports = ingredientsRouter;