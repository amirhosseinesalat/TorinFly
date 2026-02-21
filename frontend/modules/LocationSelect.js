"use client";
import { translateCity } from "../utils/cityTranslator";
import styles from "../styles/LocationSelect.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
import { useState } from "react";
function LocationSelect({ origins }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.inputLoc}>
      <CiLocationOn className={styles.icon} />
      <button onClick={() => setOpen((prev) => !prev)}>مبدا</button>
      <ul className={styles.menudrop}>
        {open && (
          <>
            <li className={styles.popularTitle}>پرتردد</li>

            {origins.map((o) => (
              <li key={o.id} className={styles.dropLi}>
                <CiLocationOn className={styles.iconDrop} />
                {translateCity(o.name)}
              </li>
            ))}
          </>
        )}
      </ul>
      <RiPinDistanceFill className={styles.icon2} />
      <button>مقصد</button>
    </div>
  );
}

export default LocationSelect;
