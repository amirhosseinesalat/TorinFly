import styles from "../styles/Search.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          <span className={styles.span}>تورینو</span> برگزار کننده بهترین تور
          های داخلی و خارجی
        </h2>
      </div>
      <div className={styles.inputLoc}>
        <CiLocationOn className={styles.icon} />
        <input placeholder="مبدا" />
        <input placeholder="مقصد" />
      </div>
      <div className={styles.date}>
        <input placeholder="تاریخ" />
      </div>
      <button className={styles.search}>جسنجو</button>
    </div>
  );
}

export default Search;
