import styles from "../../../styles/TourDetails.module.css";
import { FaUserTie } from "react-icons/fa6";
import { FaMap } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
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
    <div className={styles.container}>
      <img src={tour.image} alt={tour.title} />

      <div className={styles.info}>
        <h1>{tour.title}</h1>

        <p>{duration} روزه</p>
        <div className={styles.details}>
          <p>
            {" "}
            <FaUserTie />
            تورلیدر از مبدا
          </p>
          <p>
            {" "}
            <FaMap />
            برنامه سفر
          </p>
          <p>
            {" "}
            <PiMedal />
            تضمین کیفیت
          </p>
        </div>
        <p>وسیله نقلیه: {tour.fleetVehicle}</p>
        <p>ظرفیت: {tour.capacity}</p>
        <div className={styles.price}>
          {" "}
          <h3>
            {tour.price.toLocaleString()}
            <span style={{ fontSize: "16px", color: "gray" }}> تومان </span>
          </h3>
          <button className={styles.reserve}>رزرو و خرید</button>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
