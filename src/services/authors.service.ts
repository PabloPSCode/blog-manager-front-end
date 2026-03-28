import type { IAuthor, ICreateAuthorDTO, IUpdateAuthorDTO } from "@/dtos";
import { api, getApiErrorMessage } from "@/services/api";
import { getAuthenticatedJwt } from "@/store/auth";

type CreateAuthorInput = Omit<ICreateAuthorDTO, "avatarUrl" | "siteId"> & {
  avatarFile?: File | null;
};

type UpdateAuthorInput = Omit<IUpdateAuthorDTO, "avatarUrl" | "siteId"> & {
  avatarFile?: File | null;
};

const buildAuthorFormData = (data: {
  name?: string;
  bio?: string;
  avatarFile?: File | null;
}) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.bio !== undefined) {
    formData.append("bio", data.bio);
  }

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  return formData;
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getAuthenticatedJwt()}`,
});

export const authorsService = {
  async create(data: CreateAuthorInput): Promise<IAuthor> {
    try {
      const response = await api.post<IAuthor>(
        "/authors",
        buildAuthorFormData(data),
        {
          headers: getAuthHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel cadastrar o autor."),
      );
    }
  },

  async list(): Promise<IAuthor[]> {
    try {
      const response = await api.get<IAuthor[]>("/authors", {
        headers: getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel carregar os autores."),
      );
    }
  },

  async update(data: UpdateAuthorInput): Promise<IAuthor> {
    try {
      const response = await api.patch<IAuthor>(
        `/authors/${data.id}`,
        buildAuthorFormData(data),
        {
          headers: getAuthHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel atualizar o autor."),
      );
    }
  },

  async delete(authorId: string): Promise<IAuthor> {
    try {
      const response = await api.delete<IAuthor>(`/authors/${authorId}`, {
        headers: getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Nao foi possivel remover o autor."),
      );
    }
  },
};
