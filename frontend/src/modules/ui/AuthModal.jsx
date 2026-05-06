"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/utils/LoginForm";
import styles from "@/styles/AuthModal.module.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useRef, useEffect } from "react";
import toast from "react-hot-toast";

function AuthModal({ onClose }) {
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && step === "otp") {
      setCanResend(true);
    }
  }, [countdown, step]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:6500/auth/send-otp", {
        mobile: data.phone,
      });
      toast.success(res.data.code);
      setUserPhone(data.phone);
      setStep("otp");
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      toast.error("خطا در ارسال کد!");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const res = await axios.post("http://localhost:6500/auth/send-otp", {
        mobile: userPhone,
      });
      toast.success(res.data.code);
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      toast.error("خطا در ارسال مجدد کد!");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 6) {
      toast.error("کد تایید کامل نیست");
      return;
    }

    try {
      const res = await axios.post("http://localhost:6500/auth/check-otp", {
        mobile: userPhone,
        code: otp.join(""),
      });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("phone", userPhone);
      window.location.reload(true);
      onClose();
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "کد تایید اشتباه است";
      toast.error(message);
    }
  };

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (idx < otp.length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleOtpBackspace = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1].focus();
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p onClick={onClose} style={{ cursor: "pointer", color: "black" }}>
          <IoClose />
        </p>

        {step === "phone" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>ورود به تورین فلای</h2>
            <label>شماره موبایل</label>
            <input
              type="text"
              placeholder="09123456789"
              {...register("phone")}
              className={styles.input}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
            <button type="submit" className={styles.button}>
              ارسال کد تایید
            </button>
          </form>
        )}

        {step === "otp" && (
          <>
            <h1 style={{ fontSize: "22px" }}>کد تایید را وارد کنید.</h1>
            <h4 style={{ fontSize: "16px" }}>
              کد تایید به شماره {userPhone} ارسال شد
            </h4>

            <div className={styles.otpContainer} dir="ltr">
              {otp.map((num, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={num}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleOtpBackspace(e, idx)}
                  className={styles.otpInput}
                  autoFocus={activeIndex === idx}
                />
              ))}
            </div>

            {canResend ? (
              <h3
                onClick={handleResend}
                style={{
                  fontSize: "14px",
                  color: "#28a745",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                ارسال مجدد کد
              </h3>
            ) : (
              <h3
                style={{ fontSize: "14px", color: "#999", marginTop: "10px" }}
              >
                ارسال مجدد کد تا {countdown} ثانیه دیگر
              </h3>
            )}

            <button className={styles.button} onClick={handleVerifyOtp}>
              ورود به تورین فلای
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
