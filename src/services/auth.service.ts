import type { IAuthenticatedSiteDTO, ISite, ISiteLoginDTO } from "@/dtos";
import { api } from "./api";

export const authService = {
  async login(credentials: ISiteLoginDTO): Promise<IAuthenticatedSiteDTO> {
    const response = await api.post<IAuthenticatedSiteDTO>(
      "/auth/login",
      credentials,
    );

    return response.data;
  },

  async getMe(jwt: string): Promise<ISite> {
    const response = await api.get<ISite>("/auth/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  },
};
