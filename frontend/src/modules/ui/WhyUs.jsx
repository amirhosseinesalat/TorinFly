"use client";
import styles from "@/styles/WhyUs.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
function WhyUs() {
  const data = [
    { id: 1, image: "/images/1.jpg" },
    { id: 2, image: "/images/2.jpg" },
    { id: 3, image: "/images/3.jpg" },
    { id: 4, image: "/images/4.jpg" },
  ];
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
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          navigation
          pagination={{ type: "fraction" }}
          style={{ width: "320px" }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.card}>
                <Image src={item.image} fill alt="slide" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default WhyUs;
