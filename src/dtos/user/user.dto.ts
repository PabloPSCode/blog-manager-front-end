export interface IUser {
  id?: string;
  name: string;
  bio: string;
  siteId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateUserDTO {
  name: string;
  bio: string;
  siteId: string;
}

export interface IUpdateUserDTO {
  id: string;
  name?: string;
  bio?: string;
  siteId?: string;
}
