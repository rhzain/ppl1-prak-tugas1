const request = require('supertest');
const app = require('../src/app');
const todoModel = require('../src/models/todoModel');

// Reset the in-memory store before each test
beforeEach(() => {
  todoModel.reset();
});

describe('GET /todos', () => {
  it('should return an empty array when no todos exist', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: [] });
  });

  it('should return all todos', async () => {
    todoModel.create({ title: 'Task 1' });
    todoModel.create({ title: 'Task 2' });

    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });
});

describe('POST /todos', () => {
  it('should create a new todo with title and description', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'New Task', description: 'Some description' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      title: 'New Task',
      description: 'Some description',
      completed: false,
    });
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.createdAt).toBeDefined();
  });

  it('should create a todo with only a title', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Title Only' });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Title Only');
    expect(res.body.data.description).toBe('');
  });

  it('should return 400 when title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });

  it('should return 400 when title is an empty string', async () => {
    const res = await request(app).post('/todos').send({ title: '   ' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', async () => {
    const todo = todoModel.create({ title: 'Original' });

    const res = await request(app)
      .patch(`/todos/${todo.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.completed).toBe(true);
    expect(res.body.data.title).toBe('Original');
  });

  it('should return 404 for non-existent todo', async () => {
    const res = await request(app)
      .patch('/todos/non-existent-id')
      .send({ completed: true });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const todo = todoModel.create({ title: 'To Delete' });

    const res = await request(app).delete(`/todos/${todo.id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(todo.id);

    // Verify it's gone
    const getRes = await request(app).get('/todos');
    expect(getRes.body.data).toHaveLength(0);
  });

  it('should return 404 for non-existent todo', async () => {
    const res = await request(app).delete('/todos/non-existent-id');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
