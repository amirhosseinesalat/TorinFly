
"use client";
import UserMenu from "@/modules/ui/UserMenu";
import styles from "@/styles/TruncatePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function TruncatePage() {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      toast.error("لطفا ابتدا وارد حساب کاربری شوید");
      return;
    }

   
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]",
    );
    setTransactions(storedTransactions);
  }, [router]);


  const formatPersianDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <UserMenu />
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>تاریخ و ساعت</th>
              <th>مبلغ(تومان)</th>
              <th>نوع تراکنش</th>
              <th>شماره سفارش</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{formatPersianDate(tx.date)}</td>
                  <td>{tx.price?.toLocaleString()}</td>
                  <td>{tx.type}</td>
                  <td>{tx.orderNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  هیچ تراکنشی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TruncatePage;
