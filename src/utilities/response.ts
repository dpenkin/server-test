import { Response } from 'express';

import { ResponseStatuses, SERVER_MESSAGES } from '../config/index';

interface ResponseArguments {
  error?: Error;
  reply?: Response;
  info?: string;
  status?: number;
  data?: any;
  todo?: any;
}

type ResponseObject = Omit<ResponseArguments, 'request' | 'reply'>;

export default function response({
  data,
  todo,
  error,
  reply,
  info = SERVER_MESSAGES.ok,
  status = ResponseStatuses.OK,
}: ResponseArguments = {}): Response {
  const responseObject: ResponseObject = {
    info,
    status,
  };

  if (data) {
    responseObject.data = data;
  }

  if (todo) {
    responseObject.todo = todo;
  }

  if (error) {
    console.log(error)
  }

  return reply.status(status).send(responseObject);
}
