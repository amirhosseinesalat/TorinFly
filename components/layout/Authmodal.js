import { useState } from "react";
import styles from "../../styles/AuthModal.module.css";
import { IoClose } from "react-icons/io5";

function Authmodal({ onClose }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [input, setInput] = useState([]);
  const handleSendCode = () => {
    if (phone.length === 11) {
      setStep("otp");
    } else {
      alert("شماره معتیر وارد کنید!");
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {step === "phone" && (
          <>
            <p onClick={onClose} style={{ cursor: "pointer" }}>
              <IoClose />
            </p>
            <h2>ورود به تورین فلای</h2>
            <label>شماره موبایل خود را وارد کنید</label>
            <input
              type="text"
              placeholder="شماره موبایل"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleSendCode}>ارسال کد تایید</button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2>کد تایید را وارد کنید</h2>
            <input
              type="text"
              placeholder="کد 5 رقمی"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button>تایید</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Authmodal;
