const { env = {} } = process;
const { env: environment } = process;

export const ROUTES = {
  user: 'user',
  auth: 'auth',
};

// Server response statuses
export enum ResponseStatuses {
  OK = 200,
  NO_CONTENT = 204,
  PARTIAL_CONTETN = 206,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
// Server response messages
export const SERVER_MESSAGES = {
  accessDenied: 'ACCESS_DENIED',
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  missingData: 'MISSING_DATA',
  ok: 'OK',
  forbidden: 'FORBIDDEN',
  notFound: 'NOT_FOUND',
};

export enum ServerErrorMessages {
  ERROR_UPDATE = 'Failed to update user',
  ERROR_GET_DATA = 'Failed to get data',
}

// Application port
export const PORT = Number(env.PORT) || 8000;
