import { ICourse } from "./Course";

export interface ICertificate {
  user: {
    name: string;
  };
  course: ICourse;
}
