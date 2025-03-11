export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserResponse {
  message: string;
  data: User[];
}
