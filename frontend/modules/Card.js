"use client";
import styles from "../styles/Tours.module.css";
import Link from "next/link";
function Card({ tours }) {
  return (
    <div className={styles.grid}>
      {tours.map((tour) => (
        <div key={tour.id} className={styles.card}>
          <img src={tour.image} alt={tour.title} className={styles.image} />

          <div className={styles.cardBody}>
            <h4>{tour.title}</h4>
            <p className={styles.desc}>
              {tour.origin.name} → {tour.destination.name}
            </p>

            <div className={styles.footer}>
              <span className={styles.price}>
                {tour.price.toLocaleString()} تومان
              </span>
              <Link href={`/tour/${tour.id}`}>
                <button className={styles.reserve}>رزرو</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
