"use client";
import { useState } from "react";
import styles from "../styles/ProfilePage.module.css";
function ProfilePage() {
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
    </div>
  );
}

export default ProfilePage;
