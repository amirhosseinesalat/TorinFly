import styles from "../styles/Search.module.css";

import LocationSelect from "./LocationSelect";
import DateSelect from "./DateSelect";
async function Search() {
  const res = await fetch("http://localhost:6500/tour", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const origins = data.map((item) => item.origin);
  const filter = origins.reduce((acc, cur) => {
    const found = acc.find((a) => a.id === cur.id);
    if (!found) acc.push(cur);
    return acc;
  }, []);
  const destinations = data.map((item) => item.destination);
  const filtered = destinations.reduce((acc, cur) => {
    const found = acc.find((a) => a.id === cur.id);
    if (!found) acc.push(cur);
    return acc;
  }, []);
  return (
    <>
      <div className={styles.title}>
        <h2>
          <span className={styles.span}>تورین فلای</span> برگزار کننده بهترین
          تور های داخلی و خارجی
        </h2>
      </div>
      <div className={styles.container}>
        <LocationSelect origins={filter} destinations={filtered} />
        <DateSelect />
      </div>
    </>
  );
}

export default Search;
