import styles from "../styles/WhyUs.module.css";
import Image from "next/Image";
function WhyUs() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.whyUs}>
          <h3>
            <button className={styles.question}>?</button>
            چرا <span style={{ color: "#28a745" }}>تورین فلای</span>؟
          </h3>
          <h5 className={styles.title}>تور طبیعت گردی و تاریخی </h5>
          <p className={styles.paragraph}>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک <br />
            ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم <br />
            گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری
            <br /> کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار
            <br /> تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای <br />
            فرهنگی و تاریخی را خریداری کنید.
          </p>
        </div>
      </div>
      <div className={styles.left}>
        <Image src="/images/torinfly.png" width={80} height={55} />
      </div>
    </div>
  );
}

export default WhyUs;
