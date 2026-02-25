"use client";

import { Oval } from "react-loader-spinner";
import styles from "../../../styles/Loading.module.css";
export default function Loading() {
  return (
    <div className={styles.loaderWrapper}>
      <Oval
        height={80}
        width={80}
        color="#28a745"
        ariaLabel="oval-loading"
        visible={true}
      />
      <div style={{ animation: "spin 1s linear infinite" }}>🔄</div>
    </div>
  );
}
