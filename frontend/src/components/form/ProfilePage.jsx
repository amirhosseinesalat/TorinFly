"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "@/styles/ProfilePage.module.css";
import UserMenu from "@/modules/ui/UserMenu";
import { Oval } from "react-loader-spinner";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const profileRes = await axios.get(
          "http://localhost:6500/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUser(profileRes.data);
        localStorage.setItem("userProfile", JSON.stringify(profileRes.data));
      } catch (err) {
        console.error("Fetch error:", err);

        if (err.response?.status === 403) {
          const stored = localStorage.getItem("userProfile");
          if (stored) {
            setUser(JSON.parse(stored));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading)
    return (
      <div className={styles.loading}>
        <Oval
          height={80}
          width={80}
          color="#28a745"
          ariaLabel="oval-loading"
          visible={true}
        />
      </div>
    );

  if (!user) return <p>اطلاعاتی یافت نشد.</p>;

  return (
    <div className={styles.container}>
      <UserMenu />
      <div className={styles.wrapper}>
        <div className={styles.userInfo}>
          <h3>اطلاعات حساب کاربری</h3>
          <div>
            <p>شماره موبایل: {user.mobile || "-"}</p>
            <p>ایمیل: {user.email || "-"}</p>
            <Link href="/edit-profile">
              <button className={styles.add}>افزودن</button>
            </Link>
          </div>
        </div>

        <div className={styles.personalData}>
          <div className={styles.personalDataHead}>
            <h3>اطلاعات شخصی</h3>
            <Link href="/edit-profile">
              <button className={styles.add}>ویرایش اطلاعات</button>
            </Link>
          </div>

          <div className={styles.part1}>
            <p>
              <strong> نام و نام خانواگی:</strong>{" "}
              {user.firstName + " " + user.lastName || "-"}
            </p>
            <p>
              <strong>کد ملی:</strong> {user.nationalCode || "-"}
            </p>
          </div>
          <div className={styles.part2}>
            <p>
              <strong>جنسیت:</strong>{" "}
              {user.gender === "male"
                ? "مرد"
                : user.gender === "female"
                  ? "زن"
                  : "-"}
            </p>
            <p>
              <strong>تاریخ تولد:</strong> {user.birthDate || "-"}
            </p>
          </div>
        </div>

        <div className={styles.bankInfo}>
          <div className={styles.bankInfoHead}>
            <h3>اطلاعات حساب بانکی</h3>
            <Link href="/edit-profile">
              <button className={styles.add}>ویرایش اطلاعات</button>
            </Link>
          </div>
          <div style={{ marginTop: "30px" }}>
            <p>شماره شبا: {user.payment?.shaba_code || "-"}</p>
            <p>شماره کارت: {user.payment?.debitCard_code || "-"}</p>
            <p>شماره حساب: {user.payment?.accountIdentifier || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
