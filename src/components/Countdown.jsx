import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EVENT_DATE = new Date("2026-10-04T18:00:00");

export default function Countdown() {
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = EVENT_DATE - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown({ days: "0", hours: "0", minutes: "0", seconds: "0" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="countdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div>
        <span>{countdown.days}</span>
        <small>Días</small>
      </div>
      <div>
        <span>{countdown.hours}</span>
        <small>Horas</small>
      </div>
      <div>
        <span>{countdown.minutes}</span>
        <small>Min</small>
      </div>
      <div>
        <span>{countdown.seconds}</span>
        <small>Seg</small>
      </div>
    </motion.div>
  );
}
