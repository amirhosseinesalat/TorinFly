"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:6500/user/profile", {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          console.error("Response NOT OK");
          return;
        }

        const data = await res.json();
        console.log("Profile data received:", data);

        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    getProfile();
  }, []);

  if (!user) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h1>پروفایل کاربر</h1>
      <p>نام کامل: {user.fullName}</p>
      <p>کد ملی: {user.nationalCode}</p>
      <p>جنسیت: {user.gender}</p>
      <p>تاریخ تولد: {user.birthDate}</p>
    </div>
  );
}
