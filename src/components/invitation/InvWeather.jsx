import { motion } from "framer-motion";
import { fadeUp } from "../../data/wedding";

const DAYS = [
  { day: "Mon", date: "16" },
  { day: "Tue", date: "17" },
  { day: "Wed", date: "18" },
  { day: "Thu", date: "19" },
  { day: "Fri", date: "20" },
  { day: "Sat", date: "21", wedding: true },
  { day: "Sun", date: "22" },
];

export default function InvWeather() {
  return (
    <motion.section className="inv-section inv-weather" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Be Prepared</p>
        <h2>Wedding Week Weather</h2>
        <p className="inv-weather__note">
          Forecast for the week of November 21, 2026
        </p>
        <div className="inv-weather__grid">
          {DAYS.map(({ day, date, wedding }) => (
            <div
              key={date}
              className={`inv-weather__day${wedding ? " inv-weather__day--wedding" : ""}`}
            >
              <span className="inv-weather__day-name">{day}</span>
              <span className="inv-weather__day-date">{date}</span>
              <span className="inv-weather__icon">☀️</span>
              <span className="inv-weather__temp">-- °C</span>
            </div>
          ))}
        </div>
        <p className="inv-weather__disclaimer">
          * Forecast available closer to the date
        </p>
      </div>
    </motion.section>
  );
}
