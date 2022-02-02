const baseRouter = require('./baseRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const ingredientsRouter = require('./ingredientsRouter');
const cocktailsRouter = require('./cocktailsRouter');

const setupRoutes = (app) => {
    app.use(baseRouter);
    app.use('/users', usersRouter);
    app.use('/categories', categoriesRouter);
    app.use('/ingredients', ingredientsRouter);
    app.use('/cocktails', cocktailsRouter);
};

module.exports = setupRoutes;