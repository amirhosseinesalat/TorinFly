"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserMenu from "@/modules/ui/UserMenu";
import styles from "@/styles/MyTours.module.css";
import { Oval } from "react-loader-spinner";
import { TiLocation } from "react-icons/ti";
import { translateVehicle } from "@/utils/vehicleTranslator";
import { translateCity } from "@/utils/cityTranslator";
import { formatDate } from "@/utils/formatDate";
import toast from "react-hot-toast";

function MyTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      toast.error("لطفا ابتدا وارد حساب کاربری شوید");
      return;
    }

    const storedTours = JSON.parse(localStorage.getItem("myTours") || "[]");
    if (storedTours.length > 0) {
      setTours(storedTours);
      setLoading(false);
    }

    axios
      .get("http://localhost:6500/user/tours", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          const data = Array.isArray(res.data) ? res.data : [res.data];
          setTours(data);

          localStorage.setItem("myTours", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error("Error:", err);

        if (storedTours.length > 0) {
          setTours(storedTours);
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading)
    return (
      <div className={styles.loading}>
        <Oval
          height={80}
          width={80}
          color="#28a745"
          ariaLabel="oval-loading"
          visible={true}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <UserMenu />
      <div className={styles.wrapper}>
        <div className={styles.myTours}>
          {tours.length > 0 ? (
            tours.map((tour, index) => {
              const date = new Date();
              const end = new Date(tour.endDate);
              return (
                <div key={tour.id || index} className={styles.showTours}>
                  <div className={styles.part1}>
                    <h3>
                      <TiLocation style={{ fontSize: "15px" }} />
                      {tour.title}
                    </h3>
                    <h4>سفر با {translateVehicle(tour.fleetVehicle)}</h4>
                    {end > date ? (
                      <p className={styles.pending}>در حال برگزاری</p>
                    ) : (
                      <p className={styles.finish}>به اتمام رسیده</p>
                    )}
                  </div>
                  <div className={styles.part2}>
                    <p>
                      {translateCity(tour.origin?.name)} به{" "}
                      {translateCity(tour.destination?.name)} :
                      <span>{formatDate(tour.startDate)}</span>
                    </p>
                    <p>
                      تاریخ برگشت:<span>{formatDate(tour.endDate)}</span>{" "}
                    </p>
                  </div>
                  <hr />
                  <div className={styles.part3}>
                    <p>
                      شماره تور : <strong>{tour.id || "---"}</strong>
                    </p>
                    <p>
                      مبلغ پرداخت شده:{" "}
                      <strong>{tour.price?.toLocaleString()} تومان</strong>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>هیچ توری یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTours;
