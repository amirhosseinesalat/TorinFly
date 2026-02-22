import Card from "./Card";
import styles from "../styles/Tours.module.css";

async function Tours() {
  const res = await fetch("http://localhost:6500/tour", {
    cache: "no-store",
  });
  const tours = await res.json();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>همه تور ها</h3>
      <Card tours={tours} />
    </div>
  );
}

export default Tours;
