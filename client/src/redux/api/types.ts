enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  photo: string | null;
  role: RoleEnumType | null;
  createdAt: string;
  updatedAt: string;
  provider: string | null;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
