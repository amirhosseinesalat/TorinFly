import styles from "../styles/DateSelect.module.css";
import { MdOutlineDateRange } from "react-icons/md";
function DateSelect() {
  return (
    <>
      <div className={styles.date}>
        <MdOutlineDateRange className={styles.dateIcon} />
        <input placeholder="تاریخ" />
      </div>
      <div className={styles.searchButton}>
        <button className={styles.Button}>جستجو</button>
      </div>
    </>
  );
}

export default DateSelect;
