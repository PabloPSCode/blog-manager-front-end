import type { ICreatePostDTO, IPost, IUpdatePostDTO } from "@/dtos";
import { api, getApiErrorMessage } from "@/services/api";
import { getAuthenticatedJwt } from "@/store/auth";

type CreatePostInput = Omit<ICreatePostDTO, "backgroundUrl" | "siteId"> & {
  backgroundFile?: File | null;
};

type UpdatePostInput = Omit<IUpdatePostDTO, "backgroundUrl" | "siteId"> & {
  backgroundFile?: File | null;
};

const buildPostFormData = (data: {
  title?: string;
  authorId?: string;
  htmlContent?: string;
  backgroundFile?: File | null;
}) => {
  const formData = new FormData();

  if (data.title !== undefined) {
    formData.append("title", data.title);
  }

  if (data.authorId !== undefined) {
    formData.append("authorId", data.authorId);
  }

  if (data.htmlContent !== undefined) {
    formData.append("htmlContent", data.htmlContent);
  }

  if (data.backgroundFile) {
    formData.append("backgroundFile", data.backgroundFile);
  }

  return formData;
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getAuthenticatedJwt()}`,
});

export const postsService = {
  async create(data: CreatePostInput): Promise<IPost> {
    try {
      const response = await api.post<IPost>(
        "/posts",
        buildPostFormData(data),
        {
          headers: getAuthHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel cadastrar o post."),
      );
    }
  },

  async list(): Promise<IPost[]> {
    try {
      const response = await api.get<IPost[]>("/posts", {
        headers: getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel carregar os posts."),
      );
    }
  },

  async update(data: UpdatePostInput): Promise<IPost> {
    try {
      const response = await api.patch<IPost>(
        `/posts/${data.id}`,
        buildPostFormData(data),
        {
          headers: getAuthHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel atualizar o post."),
      );
    }
  },

  async delete(postId: string): Promise<IPost> {
    try {
      const response = await api.delete<IPost>(`/posts/${postId}`, {
        headers: getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel remover o post."),
      );
    }
  },
};
