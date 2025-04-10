import { useState } from "react";
import PageContainer from "@components/PageContainer";
import styles from "./style.module.css";
import BasicButton from "@components/BasicButton";
import PopupForm from "./PopupForm";
import SuccessPopup from "./SuccessPopup";

export function meta() {
  return [
    { title: "Simple SPA" },
    { name: "description", content: "Welcome to Simple SPA" },
  ];
}

export default function Home() {
  const [isPopupFormVisible, setIsPopupFormVisible] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  const handleClosePopupForm = () => {
    setIsPopupFormVisible(false);
  };
  const handleOpenPopupForm = () => {
    setIsPopupFormVisible(true);
  };

  const handleShowSuccessPopup = () => {
    setIsPopupFormVisible(false);
    setIsSuccessPopupVisible(true);
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupVisible(false);
  };

  return (
    <PageContainer>
      <h1 className={styles.title}>
        A better way <br /> to enjoy every day.
      </h1>
      <span className={styles.subtitle}>
        Be the first to know when we launch.
      </span>
      <BasicButton text="Request an invite" onClick={handleOpenPopupForm} />
      <PopupForm
        isVisible={isPopupFormVisible}
        onClose={handleClosePopupForm}
        onShowSuccessPopup={handleShowSuccessPopup}
      />
      <SuccessPopup
        isVisible={isSuccessPopupVisible}
        onClose={handleCloseSuccessPopup}
      />
    </PageContainer>
  );
}
