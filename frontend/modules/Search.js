"use client";
import { useState, useEffect } from "react";
import styles from "../styles/Search.module.css";

import LocationSelect from "./LocationSelect";
import DateSelect from "./DateSelect";

import Tours from "./Tours";

function Search() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(null);
  const handleSearch = () => {
    const result = tours.filter((tour) => {
      const matchOrigin = origin ? tour.origin.id === origin.id : true;

      const matchDestination = destination
        ? tour.destination.id === destination.id
        : true;

      const matchDate = date
        ? tour.startDate.startsWith(date.toISOString().split("T")[0])
        : true;

      return matchOrigin && matchDestination && matchDate;
    });

    setFilteredTours(result);
  };
  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch("http://localhost:6500/tour");
      const data = await res.json();

      setTours(data);
      setFilteredTours(data);
    };

    fetchTours();
  }, []);

  const origins = tours.map((item) => item.origin);
  const uniqueOrigins = origins.reduce((acc, cur) => {
    const found = acc.find((a) => a.id === cur.id);
    if (!found) acc.push(cur);
    return acc;
  }, []);

  const destinations = tours.map((item) => item.destination);
  const uniqueDestinations = destinations.reduce((acc, cur) => {
    const found = acc.find((a) => a.id === cur.id);
    if (!found) acc.push(cur);
    return acc;
  }, []);

  return (
    <>
      <div className={styles.title}>
        <h2>
          <span className={styles.span}>تورین فلای</span> برگزار کننده بهترین
          تور های داخلی و خارجی
        </h2>
      </div>

      <div className={styles.container}>
        <LocationSelect
          origins={uniqueOrigins}
          destinations={uniqueDestinations}
          setOrigin={setOrigin}
          setDestination={setDestination}
        />
        <DateSelect setDate={setDate} handleSearch={handleSearch} />
      </div>
      <Tours tours={filteredTours} />
      {filteredTours.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3>هیچ توری با این مشخصات پیدا نشد 😕</h3>
        </div>
      )}
    </>
  );
}

export default Search;
