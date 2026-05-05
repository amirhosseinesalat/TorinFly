"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/UserMenu.module.css";

export default function UserMenu() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className={styles.container}>
      <Link
        href="/profile"
        className={`${styles.menuItem} ${isActive("/profile") ? styles.active : ""}`}
      >
        پروفایل
      </Link>

      <Link
        href="/profile/my-tours"
        className={`${styles.menuItem} ${isActive("/profile/my-tours") ? styles.active : ""}`}
      >
        تور های من
      </Link>

      <Link
        href="/profile/transaction"
        className={`${styles.menuItem} ${isActive("/profile/transaction") ? styles.active : ""}`}
      >
        تراکنش ها
      </Link>
    </div>
  );
}
