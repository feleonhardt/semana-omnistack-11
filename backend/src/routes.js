const express = require('express');

const ongController = require('./controllers/ongController');
const casoController = require('./controllers/casoController');
const perfilController = require('./controllers/perfilController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/perfil', perfilController.index);

routes.get('/casos', casoController.index);
routes.post('/casos', casoController.create);
routes.delete('/casos/:id', casoController.delete);

module.exports = routes;
