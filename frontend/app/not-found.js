import Image from "next/image";
import styles from "../styles/NotFound.module.css";
import Link from "next/link";
function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <Link href="/">
          <button className={styles.button}>
            <h1>بازگشت به صفحه اصلی</h1>
          </button>
        </Link>
      </div>
      <div className={styles.left}>
        <Image
          src="/images/ErrorTV.png"
          width={500}
          height={500}
          alt="error pic"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
