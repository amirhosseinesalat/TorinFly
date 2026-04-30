"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserMenu from "../modules/UserMenu";
import styles from "../styles/MyTours.module.css";

function MyTours() {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTour = localStorage.getItem("myTour");

    if (storedTour) {
      setTour(JSON.parse(storedTour));
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:6500/user/tours", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTour(res.data[0]);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className={styles.container}>
      <UserMenu />
      <div className={styles.wrapper}>
        <div className={styles.myTours}>
          {tour ? (
            <div
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h2>تور خریداری شده</h2>
              <p>
                <strong>نام تور:</strong> {tour.tourTitle}
              </p>
              <p>
                <strong>قیمت:</strong> {tour.tourPrice?.toLocaleString()} تومان
              </p>
              <p>
                <strong>مدت:</strong> {tour.tourDuration} روز
              </p>
              <hr />
              <h3>اطلاعات مسافر</h3>
              <p>
                <strong>نام:</strong> {tour.fullName}
              </p>
              <p>
                <strong>کد ملی:</strong> {tour.nationalCode}
              </p>
              <p>
                <strong>جنسیت:</strong> {tour.gender === "male" ? "مرد" : "زن"}
              </p>
              <p>
                <strong>تاریخ تولد:</strong> {tour.birthDate}
              </p>
            </div>
          ) : (
            <p>هیچ توری یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTours;
