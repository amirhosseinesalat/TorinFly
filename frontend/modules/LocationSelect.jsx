"use client";
import { translateCity } from "../utils/cityTranslator";
import styles from "../styles/LocationSelect.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
import { useState } from "react";

function LocationSelect({ origins, destinations, setOrigin, setDestination }) {
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);

  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className={styles.inputLoc}>
     
      <div className={styles.selectWrapper}>
        <CiLocationOn className={styles.icon} />
        <button
          onClick={() => {
            setOpenOrigin((prev) => !prev);
            setOpenDestination(false);
          }}
        >
          {selectedOrigin ? translateCity(selectedOrigin.name) : "مبدا"}
        </button>

        {openOrigin && (
          <ul className={styles.menudrop}>
            <li className={styles.popularTitle}>پرتردد</li>
            {origins.map((o) => (
              <li
                key={o.id}
                className={styles.dropLi}
                onClick={() => {
                  setSelectedOrigin(o);
                  setOrigin(o);
                  setOpenOrigin(false);
                }}
              >
                <CiLocationOn className={styles.iconDrop} />
                {translateCity(o.name)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.selectWrapper}>
        <RiPinDistanceFill className={styles.icon2} />
        <button
          onClick={() => {
            setOpenDestination((prev) => !prev);
            setOpenOrigin(false);
          }}
        >
          {selectedDestination
            ? translateCity(selectedDestination.name)
            : "مقصد"}
        </button>

        {openDestination && (
          <ul className={styles.menudrop}>
            {destinations.map((d) => (
              <li
                key={d.id}
                className={styles.dropLi}
                onClick={() => {
                  setSelectedDestination(d);
                  setDestination(d);
                  setOpenDestination(false);
                }}
              >
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
