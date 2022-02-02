const baseRouter = require('express').Router();

baseRouter.get('/', (req, res) => {
  res.send('Coucou checkpoint4 Project Cocktails!');
});

module.exports = baseRouter;