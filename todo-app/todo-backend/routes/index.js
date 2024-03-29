const express = require('express');
const router = express.Router();
const redis = require('../redis');

const configs = require('../util/config');
const { getAsync, setAsync } = redis;

let visits = 0;
let addedTodos = 0;


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
  console.log('at /statistics')
  const todoCounter = await getAsync('todo_counter');
  res.json({
    added_todos: parseInt(todoCounter) || 0
  });
});

module.exports = router;
