"use client";
import { translateCity } from "../utils/cityTranslator";
import styles from "../styles/LocationSelect.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
import { useState } from "react";
function LocationSelect({ origins, destinations }) {
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  return (
    <div className={styles.inputLoc}>
      <div className={styles.selectWrapper}>
        <CiLocationOn className={styles.icon} />
        <button onClick={() => setOpenOrigin((prev) => !prev) }>مبدا</button>

        {openOrigin && (
          <ul className={styles.menudrop}>
            <li className={styles.popularTitle}>پرتردد</li>
            {origins.map((o) => (
              <li key={o.id} className={styles.dropLi}>
                <CiLocationOn className={styles.iconDrop} />
                {translateCity(o.name)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.selectWrapper}>
        <RiPinDistanceFill className={styles.icon2} />
        <button onClick={() => setOpenDestination((prev) => !prev)}>
          مقصد
        </button>

        {openDestination && (
          <ul className={styles.menudrop}>
            {destinations.map((d) => (
              <li key={d.id} className={styles.dropLi}>
                <RiPinDistanceFill className={styles.iconDrop} />
                {translateCity(d.name)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LocationSelect;
