"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import passengerSchema from "../utils/passengerForm";
import { Calendar, CalendarProvider } from "zaman";
import { Controller } from "react-hook-form";
import styles from "../styles/ProfilePage.module.css";
import { MdOutlineDateRange } from "react-icons/md";
function ProfilePage() {
  const [selected, setSelected] = useState("profile");
  const [calendarValue, setCalendarValue] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passengerSchema),
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };
  return (
    <div>
      <div className={styles.active}>
        <button
          className={selected === "profile" ? styles.select : ""}
          onClick={() => setSelected("profile")}
        >
          پروفایل
        </button>
        <button
          className={selected === "tours" ? styles.select : ""}
          onClick={() => setSelected("tours")}
        >
          تور های من
        </button>
        <button
          className={selected === "transaction" ? styles.select : ""}
          onClick={() => setSelected("transaction")}
        >
          تراکنش ها
        </button>
      </div>
      <div className={styles.userInfo}>
        <h2>اطلاعات حساب کاربری</h2>
        <div className={styles.phoneNumber}>
          <h4>شماره موبایل </h4>
        </div>
        <div className={styles.email}>
          <input type="email" placeholder="ادرس ایمیل " />
          <button>تایید</button>
        </div>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
          <div className={styles.passengerDetails}>
        <h2>ویرایش اطلاعات شخصی</h2>
            <input
              placeholder="نام و نام خانوادگی"
              type="text"
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <input placeholder="کد ملی" type="number" {...register("idCart")} />
            {errors.idCart && <p>{errors.idCart.message}</p>}
            <select {...register("gender")}>
              <option value="">انتخاب جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <div className={styles.dateWrapper}>
                  <div
                    className={styles.dateInputBox}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <MdOutlineDateRange className={styles.dateIcon} />
                    <span>
                      {calendarValue
                        ? calendarValue.toLocaleDateString("fa-IR")
                        : "1385/11/04"}
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
              )}
            />
            {errors.date && <p>{errors.date.message}</p>}
            <div className={styles.btn}>
              <button>تایید</button>
              <button className={styles.btn2}>انصراف</button>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default ProfilePage;
