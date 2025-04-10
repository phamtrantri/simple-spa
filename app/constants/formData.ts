import type { TFormData, TFormError } from "@typing/form";

export enum EFormFields {
  NAME = "name",
  EMAIL = "email",
  CONFIRM_EMAIL = "confirmEmail",
}

export const formInitialValues: TFormData = {
  [EFormFields.NAME]: "",
  [EFormFields.EMAIL]: "",
  [EFormFields.CONFIRM_EMAIL]: "",
};

export const formErrorInitalValues: TFormError = {
  [EFormFields.NAME]: { isError: false, errorMessage: "" },
  [EFormFields.EMAIL]: { isError: false, errorMessage: "" },
  [EFormFields.CONFIRM_EMAIL]: { isError: false, errorMessage: "" },
};
