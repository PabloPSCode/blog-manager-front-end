export interface ITutor {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  bio: string;
}

export interface ICreateTutorDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  bio: string;
}

export interface IUpdateTutorDTO {
  id: string;
  name?: string;
  phone?: string;
  bio?: string;
}
