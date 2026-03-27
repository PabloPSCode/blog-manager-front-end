import type { ISite } from "@/dtos";
import { api } from "./api";

export const sitesService = {
  async list(): Promise<ISite[]> {
    const response = await api.get<ISite[]>("/sites");

    return response.data;
  },

  async getById(siteId: string): Promise<ISite> {
    const response = await api.get<ISite>(`/sites/${siteId}`);

    return response.data;
  },
};
