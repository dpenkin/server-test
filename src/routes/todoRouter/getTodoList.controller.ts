import response from '../../utilities/response';
import { ResponseStatuses, SERVER_MESSAGES } from '../../config';
import { ITodo } from './../../types/todo';
import Todo from '../../db/models/todo';

export default async function getTodoListController( req, res) {
  try {
    const todos: ITodo[] = await Todo.find();

    if (!todos) {
      return response({
        reply: res,
        status: ResponseStatuses.FORBIDDEN,
        info: SERVER_MESSAGES.forbidden,
      });
    }

    return response({
      reply: res,
      status: ResponseStatuses.OK,
      data: todos,
    });
  } catch (error) {
    console.log('error', error)
    return response({
      error,
      reply: res,
      status: error.statusCode || ResponseStatuses.INTERNAL_SERVER_ERROR,
      info: SERVER_MESSAGES.internalServerError,
    });
  }
}
