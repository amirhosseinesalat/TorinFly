"use client";

import Link from "next/link";
import styles from "@/styles/UserMenu.module.css";
import { useState } from "react";

export default function UserMenu() {
  const [selected, setSelected] = useState("profile");

  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.active}>
        <Link
          href="/profile"
          passHref
          className={`${styles.menuItem} ${selected === "profile" ? styles.select : ""}`}
          onClick={() => {
            setSelected("profile");
          }}
        >
          پروفایل
        </Link>
        <Link
          href="/profile/my-tours"
          passHref
          className={`${styles.menuItem} ${selected === "my-tours" ? styles.select2 : ""}`}
          onClick={() => {
            setSelected("my-tours");
          }}
        >
          {" "}
          تور های من
        </Link>
        <Link
          href="/profile/transaction"
          className={`${styles.menuItem} ${selected === "transaction" ? styles.select : ""}`}
          onClick={() => {
            setSelected("transaction");
          }}
        >
          تراکنش ها
        </Link>
      </div>
    </div>
  );
}
