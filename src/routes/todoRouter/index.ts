import { Router } from 'express';

import {
    getTodoListController,
    postTodoListController,
    updateTodoListController,
    deleteTodoListController,
} from './controller';

const router = Router();

router.get('/todos', getTodoListController);

router.post('/add-todo', postTodoListController);

router.put('/edit-todo/:id', updateTodoListController);

router.delete('/delete-todo/:id', deleteTodoListController);

export default router;
