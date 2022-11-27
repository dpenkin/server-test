import response from "../../utilities/response";
import { ResponseStatuses, SERVER_MESSAGES } from "../../config";
import { ITodo } from "./../../types/todo";
import Todo from "../../db/models/todo";

interface Todo {
  name: string,
  description: string;
  status: boolean;
}

export default async function postTodoListController(req, res) {
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
