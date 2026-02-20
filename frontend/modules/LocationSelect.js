import styles from "../styles/LocationSelect.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
function LocationSelect() {
  return (
    <div className={styles.inputLoc}>
      <CiLocationOn className={styles.icon} />
      <input placeholder="مبدا" />
      <RiPinDistanceFill className={styles.icon2} />
      <input placeholder="مقصد" />
    </div>
  );
}

export default LocationSelect;
