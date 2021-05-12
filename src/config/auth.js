import env from './env';

export default {
  secret: env.appSecret,
  expiresIn: '7d',
};
