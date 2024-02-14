const MONGO_USERNAME = process.env.MONGO_USERNAME || 'Sauron';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'Ring123';
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '3456';
const MONGO_DB = process.env.MONGO_DB || 'NoteDB';

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
  MONGO_URL,
};
