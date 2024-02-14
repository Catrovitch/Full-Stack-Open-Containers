db.createUser({
    user: 'Sauron',
    pwd: 'Ring123',
    roles: [
      {
        role: 'dbOwner',
        db: 'NoteDB',
      },
    ],
  });
  
  db.createCollection('notes');
  
  db.todos.insert({ text: 'I want to find the ring'});
  db.todos.insert({ text: 'I must find the ring'});