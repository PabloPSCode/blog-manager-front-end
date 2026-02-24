export interface ICourse {
  id?: string;
  name: string;
  description: string;
  duration: string;
  cover_url: string;
  students: number;
}

export interface ICreateCourseDTO {
  name: string;
  description: string;
  cover_url: string;
}

export interface IUpdateCourseDTO {
  id: string;
  name?: string;
  description?: string;
  cover_url?: string;
}
