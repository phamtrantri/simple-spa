import React from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import styles from "./style.module.css";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className={styles.container}>
      <Header />
      <article className={styles.body}>{children}</article>
      <Footer />
    </main>
  );
};

export default PageContainer;
