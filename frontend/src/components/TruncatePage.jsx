import UserMenu from "@/modules/ui/UserMenu";
import styles from "@/styles/TruncatePage.module.css";
import { formatDate } from "@/utils/formatDate";

function TruncatePage() {
  const persianDate = formatDate(new Date());

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
            <tr>
              <td>{persianDate}</td>
              <td>12,000,000</td>
              <td>ثبت نام در تور گردشگری</td>
              <td>سفارش 12054902</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TruncatePage;
