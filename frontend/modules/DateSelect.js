"use client";
import { Calendar, CalendarProvider } from "zaman";
import { useState } from "react";
import styles from "../styles/DateSelect.module.css";
import { MdOutlineDateRange } from "react-icons/md";

function DateSelect() {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.dateWrapper}>
        <div className={styles.date} onClick={() => setOpen((prev) => !prev)}>
          <MdOutlineDateRange className={styles.dateIcon} />
          <button className={styles.buttonDate}>تاریخ</button>
        </div>

        {open && (
          <div className={styles.calendarBox}>
            <CalendarProvider locale="fa">
              <Calendar
                defaultValue={calendarValue}
                onChange={(e) => setCalendarValue(new Date(e.value))}
              />
            </CalendarProvider>
          </div>
        )}
      </div>
      <div className={styles.searchButton}>
        <button className={styles.Button}>جستجو</button>
      </div>
    </>
  );
}

export default DateSelect;
