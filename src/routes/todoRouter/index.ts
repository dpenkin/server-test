import { Router } from 'express';

import getTodos from './getTodoList.controller';
import addTodo from './postTodoList.controller';
import updateTodo from './updateTodoList.controller';
import deleteTodo from './deleteTodoList.controller';

const router = Router();

router.get('/todos', getTodos);

router.post('/add-todo', addTodo);

router.put('/edit-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

export default router;
