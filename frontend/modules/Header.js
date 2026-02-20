"use client";
import { useState, useEffect } from "react";
import Authmodal from "../modules/Authmodal";
import styles from "../styles/Layout.module.css";
import Image from "next/Image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { CiAirportSign1 } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

function Header() {
  const [phone, setPhone] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState("home");
  const [showModal, setShowModal] = useState(false);
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
          {showModal && <Authmodal onClose={() => setShowModal(false)} />}
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
            <>
              <FaSignInAlt
                className={styles.login}
                onClick={() => setShowModal(true)}
              />
              <button
                className={styles.button}
                onClick={() => setShowModal(true)}
              >
                <h3>
                  <FaUser className={styles.icon} />
                  ورود | ثبت نام
                </h3>
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
