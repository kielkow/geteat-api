import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FoodController from './app/controllers/FoodController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateFoodStore from './app/validators/FoodStore';
import validateFoodList from './app/validators/FoodList';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/api/users', validateUserStore, UserController.store);
routes.post('/api/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/api/users', validateUserUpdate, UserController.update);

routes.get('/api/foods', validateFoodList, FoodController.index);
routes.post('/api/foods', validateFoodStore, FoodController.store);

export default routes;
