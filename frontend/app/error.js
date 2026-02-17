"use client";
import styles from "../styles/ServerError.module.css";
import Image from "next/image";
function ServerError() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <h1>اتصال با سرور برقرار نیست!</h1>
        <h2>لطفا بعدا دوباره امتحان کنید.</h2>
      </div>
      <div className={styles.left}>
        <Image
          src="/images/ErrorLampRobot.png"
          width={500}
          height={500}
          alt="error pic"
        />
      </div>
    </div>
  );
}

export default ServerError;
