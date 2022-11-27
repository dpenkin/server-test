import response from '../../utilities/response';
import { ResponseStatuses, SERVER_MESSAGES } from '../../config';
import { ITodo } from './../../types/todo';
import Todo from '../../db/models/todo';

export default async function updateTodoListController(req, res) {
  try {
    const {
        params: { id },
        body,
    } = req

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id.trim() },
        body
    );

    const allTodos: ITodo[] = await Todo.find();

    return response({
      reply: res,
      status: ResponseStatuses.OK,
      data: allTodos,
    });
  } catch (error) {
    return response({
      error,
      reply: res,
      status: error.statusCode || ResponseStatuses.INTERNAL_SERVER_ERROR,
      info: SERVER_MESSAGES.internalServerError,
    });
  }
}
