export interface IPost {
  id?: string;
  name: string;
  description: string;
  duration: string;
  cover_url: string;
  students: number;
}

export interface ICreatePostDTO {
  name: string;
  description: string;
  cover_url: string;
}

export interface IUpdatePostDTO {
  id: string;
  name?: string;
  description?: string;
  cover_url?: string;
}
