import { EFormFields, formErrorInitalValues } from "@constants/formData";
import type { TFormData } from "@typing/form";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

export const isEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const FIELD_VALIDATION_RULES = {
  [EFormFields.NAME]: (formData: TFormData) => {
    const value = formData[EFormFields.NAME];
    if (isEmpty(value)) {
      return { isError: true, errorMessage: "Full name is required" };
    }

    if (value.length < 3) {
      return {
        isError: true,
        errorMessage: "Full name need to be at least 3 characters long",
      };
    }

    return { isError: false, errorMessage: "" };
  },
  [EFormFields.EMAIL]: (formData: TFormData) => {
    const value = formData[EFormFields.EMAIL];
    if (isEmpty(value)) {
      return { isError: true, errorMessage: "Email is required" };
    }
    if (!isEmail(value)) {
      return {
        isError: true,
        errorMessage:
          "Email needs to be in valid email format. E.g. abc@gmail.com",
      };
    }
    return { isError: false, errorMessage: "" };
  },
  [EFormFields.CONFIRM_EMAIL]: (formData: TFormData) => {
    const value = formData[EFormFields.CONFIRM_EMAIL];
    if (isEmpty(value)) {
      return { isError: true, errorMessage: "Confirm Email is required" };
    }
    if (!isEqual(value, formData[EFormFields.EMAIL])) {
      return {
        isError: true,
        errorMessage: "Confirm Email does not match the Email",
      };
    }
    return { isError: false, errorMessage: "" };
  },
};

export const validateFormFields = (formData: TFormData) => {
  const errors = cloneDeep(formErrorInitalValues);
  let isError = false;
  for (const fieldKey of Object.keys(formData)) {
    const error = FIELD_VALIDATION_RULES[fieldKey as EFormFields](formData);
    errors[fieldKey as EFormFields] = error;
    if (error.isError) {
      isError = true;
    }
  }

  return { isError, errors };
};
