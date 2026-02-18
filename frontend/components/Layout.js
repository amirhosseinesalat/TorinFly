"use client";
import styles from "../styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Authmodal from "../modules/Authmodal";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { CiAirportSign1 } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState("home");
  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);
  const deleteHandler = () => {
    localStorage.removeItem("phone");
    window.location.reload(false);
  };
  return (
    <>
      <header className={styles.header}>
        <Image
          className={styles.img}
          src="/images/torinfly.png"
          width={180}
          height={100}
          alt="torinfly"
          priority
        />
        <div className={styles.menu}>
          <IoIosMenu
            className={styles.hambergerMenu}
            onClick={() => setOpenMenu((prev) => !prev)}
          />
          {openMenu && (
            <>
              <div
                className={styles.backdrop}
                onClick={() => setOpenMenu(false)}
              ></div>
              <div
                className={`${styles.mobileMenu} ${
                  openMenu ? styles.open : ""
                }`}
              >
                <ul>
                  <li
                    onClick={() => setSelected("home")}
                    className={selected === "home" ? styles.active : ""}
                  >
                    <Link href="/">
                      <IoMdHome />
                      صفحه اصلی
                    </Link>
                  </li>
                  <li
                    onClick={() => setSelected("services")}
                    className={selected === "services" ? styles.active : ""}
                  >
                    <Link href="/services">
                      <CiAirportSign1 />
                      خدمات گردشگری{" "}
                    </Link>
                  </li>
                  <li
                    onClick={() => setSelected("about")}
                    className={selected === "about" ? styles.active : ""}
                  >
                    <Link href="/about-us">
                      <MdOutlineRecordVoiceOver />
                      درباره ما
                    </Link>
                  </li>
                  <li
                    onClick={() => setSelected("contact")}
                    className={selected === "contact" ? styles.active : ""}
                  >
                    {" "}
                    <Link href="/contact-us">
                      <IoIosCall />
                      تماس با ما
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          <ul className={styles.desktopMenu}>
            <li
              onClick={() => setSelected("home")}
              className={selected === "home" ? styles.active : ""}
            >
              <Link href="/">صفحه اصلی</Link>
            </li>
            <li
              onClick={() => setSelected("services")}
              className={selected === "services" ? styles.active : ""}
            >
              <Link href="/services">خدمات گردشگری </Link>
            </li>
            <li
              onClick={() => setSelected("about")}
              className={selected === "about" ? styles.active : ""}
            >
              <Link href="/about-us">درباره ما</Link>
            </li>
            <li
              onClick={() => setSelected("contact")}
              className={selected === "contact" ? styles.active : ""}
            >
              {" "}
              <Link href="contact-us">تماس با ما</Link>
            </li>
          </ul>
        </div>
        <div className={styles.left}>
          {phone ? (
            <span className={styles.phoneNumber}>
              <FaUser style={{ fontSize: "12px" }} />
              {phone}

              <IoIosArrowDown
                onClick={() => setOpen((prev) => !prev)}
                style={{ fontSize: "15px", cursor: "pointer" }}
              />

              {open && (
                <ul className={styles.menudrop}>
                  <li className={styles.dropLi}>
                    <FaUserCircle />
                    {phone}
                  </li>
                  <li style={{ color: "#10411B" }}>
                    <FaUser /> اطلاعات حساب کاربری
                  </li>
                  <li onClick={deleteHandler}>
                    <CiLogin />
                    خروج از حساب کاربری
                  </li>
                </ul>
              )}
            </span>
          ) : (
            <button
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              <h3>
                <FaUser className={styles.icon} />
                ورود | ثبت نام
              </h3>
            </button>
          )}
        </div>
      </header>
      {showModal && <Authmodal onClose={() => setShowModal(false)} />}

      {children}
      <footer>
        <hr className={styles.footerHr} />
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

export default Layout;
