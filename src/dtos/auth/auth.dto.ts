import type { ISite } from "../site/site.dto";

export interface ISiteLoginDTO {
  domain: string;
  password: string;
}

export interface IAuthenticatedSiteDTO extends ISite {
  id: string;
  jwt: string;
}

export interface ICreateSitePasswordRecoveryTokenDTO {
  domain: string;
}

export interface ICreateSitePasswordRecoveryTokenResponseDTO {
  message: string;
  domain: string;
  expiresAt: string;
}

export interface IValidateSitePasswordRecoveryTokenDTO {
  domain: string;
  code: string;
}

export interface IValidateSitePasswordRecoveryTokenResponseDTO {
  message: string;
  domain: string;
}

export interface IRecoverSitePasswordDTO {
  domain: string;
  code: string;
  password: string;
}

export interface IRecoverSitePasswordResponseDTO {
  message: string;
}
