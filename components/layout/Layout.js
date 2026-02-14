import styles from "../../styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
function Layout({ children }) {
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
          <button className={styles.button}>
            <h3>
              <FaUser className={styles.icon} />
              ورود | ثبت نام
            </h3>
          </button>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>  </footer>
    </>
  );
}

export default Layout;
