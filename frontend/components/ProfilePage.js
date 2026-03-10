"use client";
import { useState } from "react";
import styles from "../styles/ProfilePage.module.css";
function ProfilePage({ phone }) {
  const [selected, setSelected] = useState("profile");
  return (
    <div>
      <div className={styles.active}>
        <button
          className={selected === "profile" ? styles.select : ""}
          onClick={() => setSelected("profile")}
        >
          پروفایل
        </button>
        <button
          className={selected === "tours" ? styles.select : ""}
          onClick={() => setSelected("tours")}
        >
          تور های من
        </button>
        <button
          className={selected === "transaction" ? styles.select : ""}
          onClick={() => setSelected("transaction")}
        >
          تراکنش ها
        </button>
      </div>
      <div className={styles.userInfo}>
        <h2>اطلاعات حساب کاربری</h2>
        <div>
          <h4>شماره موبایل </h4>
        </div>
        <div>
          <input type="email" placeholder="ادرس ایمیل " />
          <button>تایید</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
