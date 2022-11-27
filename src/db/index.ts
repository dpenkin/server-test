import mongoose, { ConnectOptions } from 'mongoose';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,} as ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the DB');
});

module.exports = {
  jwt: 'dev-jwt',
};

module.exports = db;