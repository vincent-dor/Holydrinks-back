const baseRouter = require('./baseRouter');
const usersRouter = require('./usersRouter');

const setupRoutes = (app) => {
    app.use(baseRouter);
    app.use('/users', usersRouter);
};

module.exports = setupRoutes;