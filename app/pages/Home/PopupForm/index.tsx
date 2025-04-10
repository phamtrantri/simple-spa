import React, { useLayoutEffect, useState } from "react";
import Modal from "@components/Modal";
import Input from "@components/Input";
import BasicButton from "@components/BasicButton";
import {
  EFormFields,
  formErrorInitalValues,
  formInitialValues,
} from "@constants/formData";
import { validateFormFields } from "@utils/formValidations";
import type { TFormError, TFormData } from "@typing/form";
import styles from "./style.module.css";
import { registerEmail } from "@services/form";
import CustomError from "@constants/error";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onShowSuccessPopup: () => void;
}

const PopupForm: React.FC<IProps> = ({
  isVisible,
  onClose,
  onShowSuccessPopup,
}) => {
  const [formData, setFormData] = useState<TFormData>(formInitialValues);
  const [errors, setErrors] = useState<TFormError>(formErrorInitalValues);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetForm = () => {
    setFormData(formInitialValues);
    setErrors(formErrorInitalValues);
    setServerError("");
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const { isError, errors: validationErrors } =
        validateFormFields(formData);

      if (isError) {
        setErrors(validationErrors);
        return;
      }
      setErrors(validationErrors);

      await registerEmail({
        email: formData.email,
        name: formData.name,
      });
      handleResetForm();
      onShowSuccessPopup();
    } catch (error) {
      if (error instanceof CustomError) {
        setServerError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  useLayoutEffect(() => {
    if (isVisible) {
      handleResetForm();
    }
  }, [isVisible]);

  return (
    <Modal title="Request an invite" isVisible={isVisible} onClose={onClose}>
      <form onChange={handleChange} className={styles.form}>
        <Input
          placeholder="Full name"
          name={EFormFields.NAME}
          error={errors[EFormFields.NAME]}
        />
        <Input
          placeholder="Email"
          name={EFormFields.EMAIL}
          error={errors[EFormFields.EMAIL]}
        />
        <Input
          placeholder="Confirm Email"
          name={EFormFields.CONFIRM_EMAIL}
          error={errors[EFormFields.CONFIRM_EMAIL]}
        />
        <BasicButton
          className={styles.sendBtn}
          text={isSubmitting ? "Sending..." : "Send"}
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
        />
      </form>
      {serverError && (
        <span className={styles.serverErrorText}>{serverError}</span>
      )}
    </Modal>
  );
};

export default PopupForm;
