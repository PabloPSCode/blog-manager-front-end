import type { IPost } from "../post/post.dto";
import type { IAuthor } from "../author/author.dto";

export const DEFAULT_SITE_PASSWORD = "PLSSistemas7963";

export interface ISite {
  id?: string;
  url: string;
  domain: string;
  clientWhatsapp: string;
  posts?: IPost[];
  authors?: IAuthor[];
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateSiteDTO {
  url: string;
  domain: string;
  clientWhatsapp: string;
  password?: string;
}

export interface IUpdateSiteDTO {
  id: string;
  url?: string;
  domain?: string;
  clientWhatsapp?: string;
  password?: string;
}
