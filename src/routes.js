import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/api/users', validateUserStore, UserController.store);
routes.post('/api/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/api/users', validateUserUpdate, UserController.update);

export default routes;
