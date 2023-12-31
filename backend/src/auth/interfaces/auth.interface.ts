export interface IJWTPayload {
  sub?: number;
  uav?: number;
  email?: number;
}

export interface IJwtPayloadWithRt extends IJWTPayload {
  refreshToken: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IInforLoginThirdParty {
  username: string;
  email?: string;
  provider: string;
  picture: string;
}
