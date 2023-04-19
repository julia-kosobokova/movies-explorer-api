require('dotenv').config();

const JWT_SECRET = (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'super-strong-secret';
const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
};