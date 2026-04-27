"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/TourDetails.module.css";
import toast from "react-hot-toast";
function ReserveButton({ tourId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      const res = await fetch(`http://localhost:6500/basket/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("خطا در ثبت سبد خرید");
      }

      router.push(`/checkout/${tourId}`);
    } catch (error) {
      console.log(error);
      toast.error("ابتدا وارد حساب کاربری شوید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReserve}
      className={styles.reserve}
      disabled={loading}
    >
      {loading ? "در حال ثبت..." : "رزرو و خرید"}
    </button>
  );
}

export default ReserveButton;
