"use client";
import { Calendar, CalendarProvider } from "zaman";
import { useState } from "react";
import styles from "@/styles/DateSelect.module.css";
import { MdOutlineDateRange } from "react-icons/md";

function DateSelect({ setDate, handleSearch }) {
  const [calendarValue, setCalendarValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.dateWrapper}>
        <div className={styles.date} onClick={() => setOpen((prev) => !prev)}>
          <MdOutlineDateRange className={styles.dateIcon} />
          <button className={styles.buttonDate}>
            {calendarValue
              ? calendarValue.toLocaleDateString("fa-IR")
              : "تاریخ"}
          </button>
        </div>

        {open && (
          <div className={styles.calendarBox}>
            <CalendarProvider locale="fa">
              <Calendar
                onChange={(e) => {
                  const selected = new Date(e.value);
                  setCalendarValue(selected);
                  setDate(selected);
                  setOpen(false);
                }}
              />
            </CalendarProvider>
          </div>
        )}
      </div>

      <div className={styles.searchButton}>
        <button className={styles.Button} onClick={handleSearch}>
          جستجو
        </button>
      </div>
    </>
  );
}

export default DateSelect;
