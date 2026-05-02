"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import passengerSchema from "@/utils/passengerForm";
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

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passengerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("لطفاً ابتدا وارد حساب کاربری شوید.");
      setLoading(false);
      return;
    }

    const persianDate = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(data.date));

    const payload = {
      nationalCode: data.idCart,
      fullName: data.username,
      gender: data.gender,
      birthDate: persianDate,
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
        router.push("/profile");
      } else {
        console.error("Server Error:", responseData);

        localStorage.setItem("passengerData", JSON.stringify(payload));

        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMessage("خطا در ارتباط با سرور.");
      localStorage.setItem("passengerData", JSON.stringify(payload));

      setTimeout(() => {
        router.push("/profile");
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
        <div className={styles.passengerDetails}>
          <h2>
            <FaUser /> مشخصات مسافر
          </h2>

          <input placeholder="نام و نام خانوادگی" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}

          <select {...register("gender")}>
            <option value="">انتخاب جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}

          <input placeholder="کد ملی" type="number" {...register("idCart")} />
          {errors.idCart && <p>{errors.idCart.message}</p>}

          <Controller
            control={control}
            name="date"
            render={({ field }) => {
              return (
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
                            field.onChange(selected);
                            setOpen(false);
                          }}
                        />
                      </CalendarProvider>
                    </div>
                  )}
                </div>
              );
            }}
          />
          {errors.date && <p>{errors.date.message}</p>}
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
