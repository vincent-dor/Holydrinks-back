const baseRouter = require('./baseRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

const setupRoutes = (app) => {
    app.use(baseRouter);
    app.use('/users', usersRouter);
    app.use('/categories', categoriesRouter);
};

module.exports = setupRoutes;