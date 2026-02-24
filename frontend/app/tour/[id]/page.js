import styles from "../../../styles/TourDetails.module.css";

async function TourDetails({ params }) {
  const res = await fetch(`http://localhost:6500/tour/${params.id}`, {
    cache: "no-store",
  });

  const tour = await res.json();

  if (!tour.id) {
    return <h2>توری پیدا نشد</h2>;
  }

  return (
    <div className={styles.container}>
      <img src={tour.image} alt={tour.title} />

      <div className={styles.info}>
        <h1>{tour.title}</h1>

        <p>
          {tour.origin.name} → {tour.destination.name}
        </p>

        <p>وسیله نقلیه: {tour.fleetVehicle}</p>
        <p>ظرفیت: {tour.capacity}</p>
        <p>صندلی باقی‌مانده: {tour.availableSeats}</p>

        <h3>{tour.price.toLocaleString()} تومان</h3>

        <button className={styles.reserve}>ثبت و ادامه خرید</button>
      </div>
    </div>
  );
}

export default TourDetails;
