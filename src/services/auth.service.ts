import type {
  IAuthenticatedSiteDTO,
  ICreateSitePasswordRecoveryTokenResponseDTO,
  ICreateSitePasswordRecoveryTokenDTO,
  IRecoverSitePasswordDTO,
  IRecoverSitePasswordResponseDTO,
  ISite,
  ISiteLoginDTO,
  IValidateSitePasswordRecoveryTokenDTO,
  IValidateSitePasswordRecoveryTokenResponseDTO,
} from "@/dtos";
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

  async createRecoveryPasswordToken(
    payload: ICreateSitePasswordRecoveryTokenDTO,
  ): Promise<ICreateSitePasswordRecoveryTokenResponseDTO> {
    const response = await api.post<ICreateSitePasswordRecoveryTokenResponseDTO>(
      "/auth/recovery-password-token",
      payload,
    );

    return response.data;
  },

  async recoverPassword(
    payload: IRecoverSitePasswordDTO,
  ): Promise<IRecoverSitePasswordResponseDTO> {
    const response = await api.post<IRecoverSitePasswordResponseDTO>(
      "/auth/recovery-password",
      payload,
    );

    return response.data;
  },

  async validateRecoveryPasswordToken(
    payload: IValidateSitePasswordRecoveryTokenDTO,
  ): Promise<IValidateSitePasswordRecoveryTokenResponseDTO> {
    const response = await api.post<IValidateSitePasswordRecoveryTokenResponseDTO>(
      "/auth/validate-recovery-password-token",
      payload,
    );

    return response.data;
  },
};
