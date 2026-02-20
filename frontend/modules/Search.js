import styles from "../styles/Search.module.css";
import { CiLocationOn } from "react-icons/ci";
import { RiPinDistanceFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
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
        <RiPinDistanceFill className={styles.icon2} />
        <input placeholder="مقصد" />
      </div>
      <div className={styles.date}>
        <MdOutlineDateRange className={styles.dateIcon} />
        <input placeholder="تاریخ" />
      </div>
      <div className={styles.searchButton}>
        <button className={styles.Button}>جستجو</button>
      </div>
    </div>
  );
}

export default Search;
