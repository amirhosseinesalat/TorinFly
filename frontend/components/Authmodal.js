import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../modules/LoginForm";
import styles from "../styles/AuthModal.module.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
function AuthModal({ onClose }) {
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPhone, setUserPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:6500/auth/send-otp", {
        mobile: data.phone,
      });
      console.log(res.data);
      setUserPhone(data.phone);
      setStep("otp");
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 6) {
      alert("کد تایید کامل نیست");
      return;
    }
    try {
      const res = await axios.post("http://localhost:6500/auth/check-otp", {
        mobile: userPhone,
        code: otp.join(""),
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("phone", userPhone);
      window.dispatchEvent(new Event("storage"));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < otp.length - 1) {
      setActiveIndex(idx + 1);
    }
  };

  const handleOtpBackspace = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      setActiveIndex(idx - 1);
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
            <h1 style={{ fontSize: "22PX" }}>کد تایید را وارد کنید.</h1>
            <h4 style={{ fontSize: "16PX" }}>
              کد تایید به شماره {userPhone} ارسال شد
            </h4>
            <div className={styles.otpContainer} dir="ltr">
              {otp.map((num, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={num}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleOtpBackspace(e, idx)}
                  className={styles.otpInput}
                  autoFocus={activeIndex === idx}
                />
              ))}
            </div>
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
