"use client";
import { useState } from "react";
import styles from "../styles/Tours.module.css";

function Card({ tours }) {
  const [showAll, setShowAll] = useState(false);

  const visibleTours =
    typeof window !== "undefined" && window.innerWidth >= 768
      ? tours
      : showAll
        ? tours
        : tours.slice(0, 4);

  return (
    <>
      <div className={styles.grid}>
        {visibleTours.map((tour) => (
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
                <button className={styles.reserve}>رزرو</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className={styles.moreWrapper}>
          <button className={styles.moreBtn} onClick={() => setShowAll(true)}>
            مشاهده بیشتر
          </button>
        </div>
      )}
    </>
  );
}

export default Card;
