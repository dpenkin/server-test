import response from '../../utilities/response';
import { ResponseStatuses, SERVER_MESSAGES } from '../../config';
import { ITodo } from '../../types/todo';
import Todo from '../../db/models/todo';

interface Todo {
    name: string,
    description: string;
    status: boolean;
  }

export async function deleteTodoListController(req, res) {
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

export  async function getTodoListController( req, res) {
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

export async function postTodoListController(req, res) {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const { name, description, status }:Todo = body;

    const todo: ITodo = new Todo({
      name,
      description,
      status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    return response({
      reply: res,
      status: ResponseStatuses.OK,
      todo: newTodo,
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

export async function updateTodoListController(req, res) {
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
