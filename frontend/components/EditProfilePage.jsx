"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, CalendarProvider } from "zaman";
import styles from "../styles/EditProfilePage.module.css";
import { MdOutlineDateRange } from "react-icons/md";
import Link from "next/link";
import UserMenu from "../modules/UserMenu";
import editPassengerSchema from "../utils/editPassengerForm";
import { useRouter } from "next/navigation";

function EditProfilePage() {
  const [calendarValue, setCalendarValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPassengerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:6500/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setMobile(data.mobile || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("لطفاً ابتدا وارد حساب کاربری شوید.");
      setLoading(false);
      return;
    }

    if (!data.date) {
      setErrorMessage("تاریخ تولد الزامی است.");
      setLoading(false);
      return;
    }

    const persianDate = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(data.date));



    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthDate: persianDate,
      nationalCode: data.idCart,
      payment: {
        shaba_code: data.shabaCode || "",
        debitCard_code: data.cartNumber || "",
        accountIdentifier: data.accountNumber || "",
      },
    };

    console.log("Sending PUT Payload:", payload);

    try {
      const res = await fetch("http://localhost:6500/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.ok) {
        console.log("Update Success:", responseData);

        localStorage.setItem("userProfile", JSON.stringify(payload));

        router.push("/profile");
      } else {
        console.error("Server Error:", responseData);
        setErrorMessage(`خطا در ثبت: ${responseData.message || "مشکل نامشخص"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMessage("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.userInfo}>
        <div className={styles.sideMenu}>
          <UserMenu />
        </div>
        <div className={styles.wrap}>
          <h2>اطلاعات حساب کاربری</h2>
          <div className={styles.wrap2}>
            <div className={styles.phoneNumber}>
              <h4>شماره موبایل : {mobile || "در حال بارگذاری..."}</h4>
            </div>
            <div className={styles.email}>
              <input type="email" placeholder="آدرس ایمیل" />
              <button>تایید</button>
            </div>
          </div>
        </div>
      </div>

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

            <input
              placeholder="شماره حساب"
              type="number"
              {...register("accountNumber")}
            />

            <input
              placeholder="شماره شبا"
              type="text"
              {...register("shabaCode")}
            />

            <div className={styles.btn}>
              <button type="submit" disabled={loading}>
                {loading ? "در حال ثبت..." : "تایید"}
              </button>
              <button className={styles.btn2} type="button">
                <Link href="/profile" className={styles.Link}>
                  انصراف
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
