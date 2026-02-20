import styles from "../styles/Search.module.css";

import LocationSelect from "./LocationSelect";
import DateSelect from "./DateSelect";
function Search() {
  return (
    <>
      <div className={styles.title}>
        <h2>
          <span className={styles.span}>تورینو</span> برگزار کننده بهترین تور
          های داخلی و خارجی
        </h2>
      </div>
      <div className={styles.container}>
        <LocationSelect />
        <DateSelect />
      </div>
    </>
  );
}

export default Search;
