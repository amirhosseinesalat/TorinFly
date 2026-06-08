"use client";
import { useState } from "react";
import styles from "@/styles/checkoutPage.module.css";
import { FaUser } from "react-icons/fa";
import { Calendar, CalendarProvider } from "zaman";
import { MdOutlineDateRange } from "react-icons/md";
import { useRouter } from "next/navigation";

function CheckoutForm({ tour }) {
  const [calendarValue, setCalendarValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    nationalCode: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (
      !formData.fullName ||
      !formData.gender ||
      !formData.nationalCode ||
      !calendarValue
    ) {
      setErrorMessage("لطفاً همه فیلدها را پر کنید.");
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("لطفاً ابتدا وارد حساب کاربری شوید.");
      setLoading(false);
      return;
    }

    let birthDate = null;
    if (calendarValue) {
      const year = calendarValue.getFullYear();
      const month = String(calendarValue.getMonth() + 1).padStart(2, "0");
      const day = String(calendarValue.getDate()).padStart(2, "0");
      birthDate = `${year}-${month}-${day}`;
    }

    const payload = {
      nationalCode: formData.nationalCode || null,
      fullName: formData.fullName || null,
      gender: formData.gender || null,
      birthDate: birthDate,
    };

    console.log("Sending Payload:", payload);

    try {
      const res = await fetch("http://localhost:6500/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.ok) {
        console.log("Success:", responseData);

        localStorage.setItem("passengerData", JSON.stringify(payload));

        localStorage.setItem("myTour", JSON.stringify(tour));

        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            username: formData.fullName,
            nationalCode: formData.nationalCode,
            gender: formData.gender,
            birthDate: birthDate,
          }),
        );

        const newTransaction = {
          id: Date.now(),
          date: new Date().toISOString(),
          price: tour.price,
          type: "ثبت نام در تور گردشگری",
          orderNumber: `سفارش ${Math.floor(10000000 + Math.random() * 90000000)}`,
          tourTitle: tour.title,
        };

        const existingTransactions = JSON.parse(
          localStorage.getItem("transactions") || "[]",
        );
        existingTransactions.push(newTransaction);
        localStorage.setItem(
          "transactions",
          JSON.stringify(existingTransactions),
        );

        router.push("/profile/transaction");
      } else {
        console.error("Server Error:", responseData);
        setErrorMessage(responseData.message || "خطا در ثبت سفارش");

        localStorage.setItem("passengerData", JSON.stringify(payload));
        localStorage.setItem("myTour", JSON.stringify(tour));

        setTimeout(() => {
          router.push("/profile/transaction");
        }, 2000);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMessage("خطا در ارتباط با سرور.");

      localStorage.setItem("passengerData", JSON.stringify(payload));
      localStorage.setItem("myTour", JSON.stringify(tour));

      setTimeout(() => {
        router.push("/profile/transaction");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.container}>
      {errorMessage && (
        <div
          style={{
            color: "red",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#ffebee",
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div className={styles.passengerDetails}>
          <h2>
            <FaUser /> مشخصات مسافر
          </h2>

          <input
            placeholder="نام و نام خانوادگی"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">انتخاب جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>

          <input
            placeholder="کد ملی"
            type="number"
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleChange}
          />

          <div className={styles.dateWrapper}>
            <div
              className={styles.dateInputBox}
              onClick={() => setOpen((prev) => !prev)}
            >
              <MdOutlineDateRange className={styles.dateIcon} />
              <span>
                {calendarValue
                  ? calendarValue.toLocaleDateString("fa-IR")
                  : "تاریخ تولد"}
              </span>
            </div>
            {open && (
              <div className={styles.calendarBox}>
                <CalendarProvider locale="fa">
                  <Calendar
                    onChange={(e) => {
                      const selected = new Date(e.value);
                      setCalendarValue(selected);
                      setOpen(false);
                    }}
                  />
                </CalendarProvider>
              </div>
            )}
          </div>
        </div>

        <div className={styles.reserveBox}>
          <h3>{tour.title}</h3>
          <p className={styles.duration}>{duration} روزه</p>
          <div className={styles.divider}></div>
          <div className={styles.priceBox}>
            <span>قیمت نهایی</span>
            <span className={styles.price}>
              {tour.price.toLocaleString()} تومان
            </span>
          </div>
          <button
            type="submit"
            className={styles.finalButton}
            disabled={loading}
          >
            {loading ? "در حال ثبت..." : "ثبت و خرید نهایی"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
