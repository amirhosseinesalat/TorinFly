import styles from "../styles/MainBanner.module.css";
import Image from "next/Image";
import { FaPhoneAlt } from "react-icons/fa";

function MainBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.boxLeft}>
        <div
          style={{ color: "#ffffff", marginRight: "50px", marginTop: "35px" }}
        >
          {" "}
          <h2 style={{ fontSize: "30px" }}>
            خرید تلفنی از{" "}
            <span style={{ color: "#10411B", whiteSpace: "nowrap" }}>
              تورین فلای
            </span>
          </h2>
          <p style={{ fontSize: "20px" }}>به هرکجا که میخواهید!</p>
        </div>
        <Image
          className={styles.img}
          src="/images/mancall.png"
          width={320}
          height={202}
          alt="mencall"
        />{" "}
      </div>
      <div className={styles.boxRight}>
        {" "}
        <h3>
          {" "}
          021-1840
          <FaPhoneAlt style={{ fontSize: "14PX" }} />
        </h3>
        <button className={styles.Button}>اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

export default MainBanner;
