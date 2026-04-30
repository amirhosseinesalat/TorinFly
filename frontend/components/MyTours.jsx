"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserMenu from "../modules/UserMenu";
import styles from "../styles/MyTours.module.css";
import { Oval } from "react-loader-spinner";
import { TiLocation } from "react-icons/ti";
import { translateVehicle } from "../utils/vehicleTranslator";
import { translateCity } from "../utils/cityTranslator";
import { formatDate } from "../utils/formatDate";
function MyTours() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = new Date();

  const end = new Date(tour.endDate);

  useEffect(() => {
    const storedTour = localStorage.getItem("myTour");

    if (storedTour) {
      setTour(JSON.parse(storedTour));
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:6500/user/tours", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTour(res.data[0]);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

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
          {tour ? (
            <div className={styles.showTours}>
              <div className={styles.part1}>
                <h3>
                  {" "}
                  <TiLocation style={{ fontSize: "15px" }} />
                  {tour.title}
                </h3>
                <h4>سفر با {translateVehicle(tour.fleetVehicle)}</h4>
                {end > date ? (
                  <p className={styles.pending}>در حال برگزاری</p>
                ) : (
                  <p className={styles.finish}>به اتمام رسیده </p>
                )}
              </div>
              <div className={styles.part2}>
                <p>
                  <strong>
                    {translateCity(tour.origin.name)} به{" "}
                    {translateCity(tour.destination.name)} :
                    {formatDate(tour.startDate)}
                  </strong>{" "}
                </p>
                <p>
                  <strong>تاریخ برگشت: {formatDate(tour.endDate)}</strong>
                </p>
              </div>
              <hr />
              <div className={styles.part3}>
                <p>
                  شماره تور : <strong>102095404</strong>
                </p>
                <p>
                  مبلغ پرداخت شده:<strong>{tour.price} تومان</strong>
                </p>
              </div>
            </div>
          ) : (
            <p>هیچ توری یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTours;
