import type { EFormFields } from "@constants/formData";

type TFormError = Record<
  EFormFields,
  { isError: boolean; errorMessage: string }
>;

type TFormData = Record<EFormFields, string>;

interface IRegisterReq {
  email: string;
  name: string;
}
type IRegisterRes = string;
