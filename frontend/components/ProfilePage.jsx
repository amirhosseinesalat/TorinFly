"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProfilePage.module.css";
import UserMenu from "../modules/UserMenu";
import { Oval } from "react-loader-spinner";
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
          </div>
        </div>

        <div className={styles.personalData}>
          <h3>اطلاعات شخصی</h3>

          {passengerData ? (
            <>
              <p>
                <strong>نام و نام خانوادگی:</strong> {passengerData.fullName}
              </p>
              <p>
                <strong>کد ملی:</strong> {passengerData.nationalCode}
              </p>
              <p>
                <strong>جنسیت:</strong>{" "}
                {passengerData.gender === "male" ? "مرد" : "زن"}
              </p>
              <p>
                <strong>تاریخ تولد:</strong> {passengerData.birthDate}
              </p>
            </>
          ) : (
            <p>هیچ اطلاعات مسافری یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}
