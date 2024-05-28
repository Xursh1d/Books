export interface SignUpRequest {
  name: string;
  email: string;
  key: string;
  secret: string;
}
export type SignUpKeySecret = Pick<SignUpRequest, "key" | "secret">;
export interface SignUpResponse extends SignUpRequest {
  id: number;
  isOk: boolean;
  message: string;
}

export interface ErrorMessage {
  status: number;
  data: {
    data: null | any;
    message: string;
    isOk: boolean;
  };
}
