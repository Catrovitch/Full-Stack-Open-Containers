const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});


/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  // Increment todo counter in Redis
  try {
    await setAsync('todo_counter', await getAsync('todo_counter') + 1);
  } catch (error) {
    console.error('Error incrementing todo counter:', error);
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
    // Access the todo directly from req.todo
    const todo = req.todo;
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    // Retrieve the todo item from req.todo
    const todo = req.todo;
    console.log('here')
    // Update the todo item with the new data from req.body
    todo.text = req.body.text;
    todo.done = req.body.done;

    // Save the updated todo item to the database
    await todo.save();

    // Respond with the updated todo item
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
