const ingredientsRouter = require('express').Router();

const {
  findAllIngredients,
  findOneIngredient,
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

module.exports = ingredientsRouter;