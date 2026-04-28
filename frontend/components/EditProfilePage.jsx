"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Calendar, CalendarProvider } from "zaman";
import { Controller } from "react-hook-form";
import styles from "../styles/EditProfilePage.module.css";
import { MdOutlineDateRange } from "react-icons/md";
import Link from "next/link";
import UserMenu from "../modules/UserMenu";
import editPassengerSchema from "../utils/editPassengerForm";

function EditProfilePage() {
  const [calendarValue, setCalendarValue] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPassengerSchema),
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };
  return (
    <div>
      <div className={styles.userInfo}>
        <div className={styles.sideMenu}>
          {" "}
          <UserMenu />
        </div>
        <div className={styles.wrap}>
          <h2>اطلاعات حساب کاربری</h2>
          <div className={styles.wrap2}>
            <div className={styles.phoneNumber}>
              <h4>شماره موبایل : 09165180927 </h4>
            </div>
            <div className={styles.email}>
              <input type="email" placeholder="ادرس ایمیل " />
              <button>تایید</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapper}>
            <div className={styles.passengerDetails}>
              <h2>ویرایش اطلاعات شخصی</h2>
              <input
                placeholder="نام و نام خانوادگی"
                type="text"
                {...register("username")}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <input
                placeholder="کد ملی"
                type="number"
                {...register("idCart")}
              />
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
                )}
              />
              {errors.date && <p>{errors.date.message}</p>}
              <div className={styles.btn}>
                <button type="submit">تایید</button>
                <button className={styles.btn2}>
                  <Link href="/" className={styles.Link}>
                    {" "}
                    انصراف{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div
            className={styles.passengerDetails}
            style={{ marginTop: "20px" }}
          >
            <h2>ویرایش اطلاعات حساب بانکی</h2>
            <input
              placeholder="شماره کارت"
              type="number"
              {...register("cartNumber")}
            />
            {errors.cartNumber && <p>{errors.cartNumber.message}</p>}

            <input placeholder="شماره حساب" type="number" />

            <input placeholder="شماره شبا" type="number" />

            <div className={styles.btn}>
              <button type="submit">تایید</button>

              <button className={styles.btn2}>
                {" "}
                <Link href="/" className={styles.Link}>
                  انصراف{" "}
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
