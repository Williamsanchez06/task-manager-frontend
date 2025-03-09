export const enum EndPoints {

  // ** AUTENTICACION ** \\
  LOGIN = '/auth/',
  RENEW_TOKEN = '/auth/renew-token',

  // ** USUARIOS ** \\
  CREATE_USER = '/users',
  GET_USERS = '/users',
  GET_USER_BY_ID = '/users/:id',

  // ** TAREAS ** \\
  CREATE_TASK = '/tasks',
  GET_TASKS = '/tasks',
  GET_SHARED_TASKS = '/tasks/shared',
  GET_TASK_BY_ID = '/tasks/:id',
  UPDATE_TASK = '/tasks/:id',
  DELETE_TASK = '/tasks/:id',
  SHARE_TASK = '/tasks/:id/share'

}
