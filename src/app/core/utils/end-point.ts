export const enum EndPoints {

  // ** AUTENTICACION ** \\
  LOGIN = '/auth/',
  RENEW_TOKEN = '/auth/renew-token',

  // ** USUARIOS ** \\
  CREATE_USER = '/users',
  GET_USERS = '/users',
  GET_USER_BY_ID = '/users/:id',

  // ** TAREAS ** \\
  TASKS = '/tasks',

}
