"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProfilePage.module.css";
import UserMenu from "../modules/UserMenu";
import { Oval } from "react-loader-spinner";
import Link from "next/link";
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [passengerData, setPassengerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
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

        const storedPassenger = localStorage.getItem("passengerData");
        if (storedPassenger) {
          setPassengerData(JSON.parse(storedPassenger));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  if (!user)
    return (
      <div className={styles.loading}>
        {" "}
        <Oval
          height={80}
          width={80}
          color="#28a745"
          ariaLabel="oval-loading"
          visible={true}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <UserMenu />

      <div className={styles.wrapper}>
        <div className={styles.userInfo}>
          <h3>اطلاعات حساب کاربری</h3>
          <div>
            <p>شماره موبایل :{user.mobile}</p>
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
          {passengerData ? (
            <>
              <div className={styles.part1}>
                <p>
                  <strong>نام و نام خانوادگی:</strong> {passengerData.fullName}
                </p>
                <p>
                  <strong>کد ملی:</strong> {passengerData.nationalCode}
                </p>
              </div>
              <div className={styles.part2}>
                <p>
                  <strong>جنسیت:</strong>{" "}
                  {passengerData.gender === "male" ? "مرد" : "زن"}
                </p>
                <p>
                  <strong>تاریخ تولد:</strong> {passengerData.birthDate}
                </p>
              </div>
            </>
          ) : (
            <p>هیچ اطلاعات مسافری یافت نشد.</p>
          )}
        </div>
        <div className={styles.bankInfo}>
          <div className={styles.bankInfoHead}>
            <h3> اطلاعات حساب بانکی</h3>
            <Link href="/edit-profile">
              <button className={styles.add}>ویرایش اطلاعات</button>
            </Link>
          </div>
          <div style={{ marginTop: "30px" }}>
            <p>شماره شبا:{user.shaba_code || "-"}</p>
            <p> شماره کارت:{user.debitCard_code || "-"}</p>
          </div>
          <p style={{ marginTop: "30px" }}>
            {" "}
            شماره حساب:{user.accountIdentifier || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
