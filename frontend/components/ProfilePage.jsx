"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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

  if (!user) return <p>در حال بارگذاری...</p>;

  return (
    <div
      style={{
        padding: "20px",
        direction: "rtl",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      <h1>پروفایل کاربر</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h3>اطلاعات حساب کاربری</h3>
        <p>ایمیل/نام کاربری: {user.email || user.username || "-"}</p>
      </div>

      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>اطلاعات مسافر (ثبت شده)</h3>

        {passengerData ? (
          <>
            <p>
              <strong>نام کامل:</strong> {passengerData.fullName}
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
  );
}
