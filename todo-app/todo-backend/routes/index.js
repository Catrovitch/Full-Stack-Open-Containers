const express = require('express');
const router = express.Router();
const redis = require('../redis');

const configs = require('../util/config');
const { getAsync, setAsync } = redis;

let visits = 0;
let addedTodos = 0;

// Middleware to increment the todo counter
router.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/') {
    // Increment the todo counter when a todo is added
    addedTodos++;
    // Increment the counter in Redis
    setAsync('todo_counter', addedTodos);
  }
  next();
});

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;
  res.send({
    ...configs,
    visits
  });
});

/* GET statistics */
router.get('/statistics', async (req, res) => {
  // Get the todo counter from Redis
  const todoCounter = await getAsync('todo_counter');
  res.json({
    added_todos: parseInt(todoCounter) || 0
  });
});

module.exports = router;
