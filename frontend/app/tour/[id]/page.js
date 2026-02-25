import styles from "../../../styles/TourDetails.module.css";
import { formatDate } from "../../../utils/formatDate";
import { translateVehicle } from "../../../utils/vehicleTranslator";
import { FaUserTie } from "react-icons/fa6";
import { FaMap } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
import { TiLocation } from "react-icons/ti";
import { FaCalendar } from "react-icons/fa";
import { MdDirectionsTransit } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { IoShieldCheckmark } from "react-icons/io5";
async function TourDetails({ params }) {
  const res = await fetch(`http://localhost:6500/tour/${params.id}`, {
    cache: "no-store",
  });

  const tour = await res.json();
  console.log(tour);
  if (!tour.id) {
    return <h2>توری پیدا نشد</h2>;
  }
  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);

  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={tour.image} alt={tour.title} />
          <div className={styles.detailsTour}>
            <h2>
              <TiLocation />
              مبدا <p>{tour.title}</p>
            </h2>
            <h2>
              <FaCalendar />
              تاریخ رفت
              <p>{formatDate(tour.startDate)}</p>
            </h2>
            <h2>
              <FaCalendar />
              تاریخ برگشت
              <p>{formatDate(tour.endDate)}</p>
            </h2>
            <h2>
              <MdDirectionsTransit />
              حمل و نقل
              <p>{translateVehicle(tour.fleetVehicle)}</p>
            </h2>
            <h2>
              <HiUsers />
              ظرفیت
              <p>حداکثر{tour.availableSeats}نفر</p>
            </h2>
            <h2>
              <IoShieldCheckmark />
              بیمه
              <p>{tour.insurance ? tour.insurance : " ندارد"}</p>
            </h2>
          </div>
        </div>

        <div className={styles.info}>
          <h1> {tour.title} </h1>

          <p>{duration} روزه</p>

          <div className={styles.details}>
            <p>
              <FaUserTie /> تورلیدر از مبدا
            </p>
            <p>
              <FaMap /> برنامه سفر
            </p>
            <p>
              <PiMedal /> تضمین کیفیت
            </p>
          </div>

          <div className={styles.price}>
            <h3>
              {tour.price.toLocaleString()}
              <span style={{ fontSize: "16px", color: "gray" }}> تومان </span>
            </h3>
            <button className={styles.reserve}>رزرو و خرید</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourDetails;
