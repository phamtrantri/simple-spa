import React from "react";
import styles from "./style.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <small>
        <p>Made with ♥ in Melbourne.</p>
        <p>&copy; 2023 Broccoli & Co. All rights reserved.</p>
      </small>
    </footer>
  );
};

export default Footer;
