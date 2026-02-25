import { IPost } from "./Post";

export interface ICertificate {
  user: {
    name: string;
  };
  course: IPost;
}
