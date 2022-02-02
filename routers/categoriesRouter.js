const categoriesRouter = require('express').Router();

const {
  findAllCategories,
  findOneCategory,
} = require('../models/categoriesModel');

 // const { findAllByCategory } = require('../models/productsModel');


categoriesRouter.get('/', async (req, res) => {
  try {
    const [result] = await findAllCategories();

    if (!result.length) {
      return res.status(404).json({ message: 'No categories found' });
    }
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `An error occurred: ${err.message}` });
  }
});

categoriesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await findOneCategory(id);
  return res.json(result);
});

// categoriesRouter.get('/:name/cocktails', async (req, res) => {
//  const { name } = req.params;
//  const { isAvailable } = req.query;
//  const [result] = await findAllByCategory(name, isAvailable);
//  return res.json(result);
// });

module.exports = categoriesRouter;