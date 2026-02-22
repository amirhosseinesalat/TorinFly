import styles from "../styles/MainBanner.module.css";
import Image from "next/Image";
function MainBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.boxLeft}>
        <Image src="" />{" "}
      </div>
      <div className={styles.boxRight}> </div>
    </div>
  );
}

export default MainBanner;
