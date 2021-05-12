export default {
  port: process.env.PORT || 5050,
  nodeEnv: process.env.NODE_ENV || 'development',
  appSecret: process.env.APP_SECRET || 'appsecretgeteat',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/geteat-api',
};
