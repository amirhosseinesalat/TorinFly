"use client";
import Card from "./Card";
import styles from "@/styles/Tours.module.css";

function Tours({ tours, isLoading }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>همه تور ها</h3>
      <Card tours={tours} isLoading={isLoading} />
    </div>
  );
}

export default Tours;
