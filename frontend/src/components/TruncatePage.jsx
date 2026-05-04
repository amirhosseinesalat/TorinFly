import UserMenu from "@/modules/ui/UserMenu";
import styles from "@/styles/TruncatePage.module.css";
import { formatDate } from "@/utils/formatDate";
function TruncatePage() {
  return (
    <div className={styles.container}>
      <UserMenu />
      <div className={styles.table}>
        <table>
          <thead>
            <th>تاریخ و ساعت</th>
            <th>مبلغ(تومان)</th>
            <th>نوع تراکنش</th>
            <th>شماره سفارش </th>
          </thead>
          <tbody>
            <td></td>
            <td>dlf</td>
            <td>dlf</td>
            <td>dlf</td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TruncatePage;
