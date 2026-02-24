export interface IUser {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  password?: string;
}

export interface ICreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
}

export interface IUpdateUserDTO {
  id: string;
  password?: string;
  phone?: string;
}
