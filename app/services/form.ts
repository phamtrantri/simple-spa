import type { IRegisterReq, IRegisterRes } from "@typing/form";
import request from "./base";

export const registerEmail = async (body: IRegisterReq) => {
  return request.postAsync<IRegisterReq, IRegisterRes>("fake-auth", body);
};
