"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import passengerSchema from "../utils/passengerForm";
import styles from "../styles/checkoutPage.module.css";
import { FaUser } from "react-icons/fa";
function CheckoutForm({ tour }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passengerSchema),
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };
  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.container}>
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

          <input placeholder="کد ملی" {...register("idCart")} />
          {errors.idCart && <p>{errors.idCart.message}</p>}

          <input type="date" {...register("date")} />
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

          <button type="submit" className={styles.finalButton}>
            ثبت و خرید نهایی
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
