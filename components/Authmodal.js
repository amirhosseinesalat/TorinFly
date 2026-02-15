import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../modules/LoginForm";
import styles from "../styles/AuthModal.module.css";
import { IoClose } from "react-icons/io5";
function AuthModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("شماره موبایل:", data.phone);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p onClick={onClose} style={{ cursor: "pointer", color: "black" }}>
          <IoClose />
        </p>
        <h2>ورود به تورین فلای</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>شماره موبایل</label>
          <input type="text" placeholder="09123456789" {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
          <button type="submit">ارسال کد تایید</button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
