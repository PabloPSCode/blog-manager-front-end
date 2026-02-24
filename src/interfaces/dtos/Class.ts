export interface IClass {
  name: string;
  description: string;
  tutor_name: string;
  module_name: string;
  course_name: string;
  video_url: string;
  duration: string;
}

export interface ICreateClassDTO {
  name: string;
  description: string;
  course_id: string;
  tutor_id: string;
  module_id: string;
  video_url: string;
}

export interface IUpdateClassDTO {
  name?: string;
  description?: string;
  tutor_id?: string;
  module_id?: string;
  video_url?: string;
}
