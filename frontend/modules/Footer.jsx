import styles from "../styles/Layout.module.css";
import Image from "next/image";
function Footer() {
  return (
    <>
      <footer>
        <hr className={styles.footerHr} />

        <div className={styles.container}>
          <div className={styles.torinfly}>
            <ul>
              <li className={styles.first}>تورین فلای</li>
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا تورینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
            <ul>
              <li className={styles.first}>خدمات مشتریان</li>
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
            </ul>
          </div>
          <div className={styles.leftsection}>
            <Image
              className={styles.imgleft}
              src="/images/torinfly.png"
              width={150}
              height={90}
              alt="Logo"
              fetchPriority="low"
            />
            <h3 className={styles.phone}>تلفن پشتیبانی:8574-021</h3>
            <div className={styles.logos}>
              <Image
                src="/images/state-airline-f45c55b2 1.png"
                width={65}
                height={65}
                alt="Logo"
                fetchPriority="low"
              />
              <Image
                src="/images/samandehi-6e2b448a.png"
                width={65}
                height={65}
                alt="Logo"
                fetchPriority="low"
              />
              <Image
                src="/images/passenger-rights-48368f81 1.png"
                width={65}
                height={65}
                alt="Logo"
                fetchPriority="low"
              />
              <Image
                src="/images/ecunion-35c3c933.png"
                width={65}
                height={65}
                alt="Logo"
                fetchPriority="low"
              />
              <Image
                src="/images/aira-682b7c43.png"
                width={65}
                height={65}
                alt="Logo"
                fetchPriority="low"
              />
            </div>
          </div>
        </div>
        <p className={styles.paragraph}>
          کلیه حقوق این وب سایت متعلق به تورین فلای میباشد.
        </p>
      </footer>
    </>
  );
}

export default Footer;
