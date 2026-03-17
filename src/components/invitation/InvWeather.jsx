import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../data/wedding";

// Coordenadas de Cuernavaca, Morelos
const LAT = 18.9261;
const LON = -99.2319;

// Semana de la boda: lun 17 nov → dom 23 nov 2026
const WEEK = [
  { day: "Mar", date: "17", iso: "2026-11-17" },
  { day: "Mié", date: "18", iso: "2026-11-18" },
  { day: "Jue", date: "19", iso: "2026-11-19" },
  { day: "Vie", date: "20", iso: "2026-11-20" },
  { day: "Sáb", date: "21", iso: "2026-11-21", wedding: true },
  { day: "Dom", date: "22", iso: "2026-11-22" },
  { day: "Lun", date: "23", iso: "2026-11-23" },
];

function codeToIcon(code) {
  if (code === 0)            return "☀️";
  if (code <= 3)             return "⛅";
  if (code <= 48)            return "🌫️";
  if (code <= 55)            return "🌦️";
  if (code <= 67)            return "🌧️";
  if (code <= 77)            return "🌨️";
  if (code <= 82)            return "🌧️";
  return "⛈️";
}

export default function InvWeather() {
  const [forecast, setForecast] = useState(null); // null | array
  const [status,   setStatus]   = useState("idle"); // idle | loading | ok | soon | error

  useEffect(() => {
    const today       = new Date();
    const weddingWeek = new Date("2026-11-17");
    const daysUntil   = Math.floor((weddingWeek - today) / 86_400_000);

    if (daysUntil > 16) {
      setStatus("soon");
      return;
    }

    setStatus("loading");

    const start = WEEK[0].iso;
    const end   = WEEK[WEEK.length - 1].iso;

    fetch(
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&daily=temperature_2m_max,weathercode` +
      `&timezone=America%2FMexico_City` +
      `&start_date=${start}&end_date=${end}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.daily?.temperature_2m_max?.length) {
          setStatus("soon");
          return;
        }
        setForecast(
          WEEK.map((w, i) => ({
            ...w,
            icon: codeToIcon(data.daily.weathercode[i]),
            temp: Math.round(data.daily.temperature_2m_max[i]),
          }))
        );
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <motion.section className="inv-section inv-weather" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <div className="inv-weather__card">
          <p className="inv-section__label">Prepárate</p>
          <h2>Clima de la Semana</h2>
          <p className="inv-weather__note">
            Pronóstico para la semana del 21 de noviembre de 2026 · Cuernavaca
          </p>

          {status === "loading" && (
            <p className="inv-weather__disclaimer">Cargando pronóstico...</p>
          )}

          {(status === "ok" && forecast) && (
            <div className="inv-weather__grid">
              {forecast.map(({ day, date, icon, temp, wedding }) => (
                <div
                  key={date}
                  className={`inv-weather__day${wedding ? " inv-weather__day--wedding" : ""}`}
                >
                  <span className="inv-weather__day-name">{day}</span>
                  <span className="inv-weather__day-date">{date}</span>
                  <span className="inv-weather__icon">{icon}</span>
                  <span className="inv-weather__temp">{temp} °C</span>
                </div>
              ))}
            </div>
          )}

          {(status === "soon" || status === "idle") && (
            <div className="inv-weather__grid">
              {WEEK.map(({ day, date, wedding }) => (
                <div
                  key={date}
                  className={`inv-weather__day${wedding ? " inv-weather__day--wedding" : ""}`}
                >
                  <span className="inv-weather__day-name">{day}</span>
                  <span className="inv-weather__day-date">{date}</span>
                  <span className="inv-weather__icon">🌤️</span>
                  <span className="inv-weather__temp">-- °C</span>
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="inv-weather__grid">
              {WEEK.map(({ day, date, wedding }) => (
                <div
                  key={date}
                  className={`inv-weather__day${wedding ? " inv-weather__day--wedding" : ""}`}
                >
                  <span className="inv-weather__day-name">{day}</span>
                  <span className="inv-weather__day-date">{date}</span>
                  <span className="inv-weather__icon">🌤️</span>
                  <span className="inv-weather__temp">-- °C</span>
                </div>
              ))}
            </div>
          )}

          <p className="inv-weather__disclaimer">
            {status === "ok"
              ? "* Temperatura máxima · Fuente: Open-Meteo"
              : "* Pronóstico disponible próximamente"}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
