
import response from '../../utilities/response';
import { ResponseStatuses, SERVER_MESSAGES } from '../../config';
import { ITodo } from '../../types/todo';
import Todo from '../../db/models/todo';

export default async function deleteTodoListController(req, res) {
  try {
    const { id } = req.params;

    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);

    const allTodos: ITodo[] = await Todo.find();

    return response({
      reply: res,
      status: ResponseStatuses.OK,
      todo: deletedTodo,
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
