import styles from "../styles/ShortDescription.module.css";
import Image from "next/image";
function ShortDescription() {
  return (
    <>
      <hr className={styles.topHr} />
      <div className={styles.container}>
        <div className={styles.right}>
          <Image
            src="/images/Group16.png"
            width={80}
            height={80}
            alt="short desc"
            fetchPriority="low"
          />
          <h4>
            بصرفه ترین قیمت{" "}
            <p>
              بصرفه ترین و ارزان ترین قیمت <br />
              تور را از ما بخواهید.
            </p>
          </h4>
        </div>
        <div className={styles.center}>
          <Image
            src="/images/Group17.png"
            width={80}
            height={80}
            alt="short desc"
            fetchPriority="low"
          />
          <h4>
            پشتیبانی{" "}
            <p>
              پشتیبانی و همراهی 24 ساعته در
              <br /> تمامی مراحل سفر شما.
            </p>
          </h4>
        </div>
        <div className={styles.left}>
          <Image
            src="/images/Group18.png"
            width={80}
            height={80}
            alt="short desc"
            fetchPriority="low"
          />
          <h4>
            رضایت کاربران{" "}
            <p>
              رضایت بیش از 10هزار کاربر از <br />
              تور های ما.
            </p>
          </h4>
        </div>
      </div>
    </>
  );
}

export default ShortDescription;
