import styles from "../styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import Authmodal from "../components/Authmodal";

function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Image
          className={styles.img}
          src="/images/torinfly.png"
          width={180}
          height={100}
          alt="torinfly"
        />
        <div className={styles.menu}>
          <ul>
            <li>
              <Link
                href="/"
                style={{ "text-decoration": "none", color: "#282828" }}
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                style={{ "text-decoration": "none", color: "#282828" }}
              >
                خدمات گردشگری{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                style={{ "text-decoration": "none", color: "#282828" }}
              >
                درباره ما
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="contact-us"
                style={{ "text-decoration": "none", color: "#282828" }}
              >
                تماس با ما
              </Link>{" "}
            </li>
          </ul>
        </div>
        <div className={styles.left}>
          <button className={styles.button} onClick={() => setShowModal(true)}>
            <h3>
              <FaUser className={styles.icon} />
              ورود | ثبت نام
            </h3>
          </button>
        </div>
      </header>
      {showModal && <Authmodal onClose={() => setShowModal(false)} />}

      {children}
      <footer>
        <hr style={{ width: "850px", marginRight: "288px" }}></hr>{" "}
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
            />
            <h3 className={styles.phone}>تلفن پشتیبانی:8574-021</h3>
            <div className={styles.logos}>
              <Image
                src="/images/state-airline-f45c55b2 1.png"
                width={65}
                height={65}
                alt="Logo"
              />
              <Image
                src="/images/samandehi-6e2b448a.png"
                width={65}
                height={65}
                alt="Logo"
              />
              <Image
                src="/images/passenger-rights-48368f81 1.png"
                width={65}
                height={65}
                alt="Logo"
              />
              <Image
                src="/images/ecunion-35c3c933.png"
                width={65}
                height={65}
                alt="Logo"
              />
              <Image
                src="/images/aira-682b7c43.png"
                width={65}
                height={65}
                alt="Logo"
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

export default Layout;
