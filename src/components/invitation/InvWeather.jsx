import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "../../data/wedding";
import { useParallaxY } from "../../hooks/useParallaxY";
import InvReveal from "../InvReveal";

const LAT = 18.9261;
const LON = -99.2319;

const WEEK = [
  { day: "Lun", date: "17", iso: "2026-11-17" },
  { day: "Mar", date: "18", iso: "2026-11-18" },
  { day: "Mié", date: "19", iso: "2026-11-19" },
  { day: "Jue", date: "20", iso: "2026-11-20" },
  { day: "Sáb", date: "21", iso: "2026-11-21", wedding: true },
  { day: "Dom", date: "22", iso: "2026-11-22" },
  { day: "Lun", date: "23", iso: "2026-11-23" },
];

function codeToIcon(code) {
  if (code === 0)  return "☀️";
  if (code <= 3)   return "⛅";
  if (code <= 48)  return "🌫️";
  if (code <= 55)  return "🌦️";
  if (code <= 67)  return "🌧️";
  if (code <= 77)  return "🌨️";
  if (code <= 82)  return "🌧️";
  return "⛈️";
}

export default function InvWeather() {
  const [forecast, setForecast] = useState(null);
  const [status,   setStatus]   = useState("idle");
  const photoSrc = WEDDING.sectionPhotos.weather;
  const { ref, y } = useParallaxY(40);

  useEffect(() => {
    const today       = new Date();
    const weddingWeek = new Date("2026-11-17");
    const daysUntil   = Math.floor((weddingWeek - today) / 86_400_000);

    if (daysUntil > 16) { setStatus("soon"); return; }

    setStatus("loading");
    fetch(
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
      `&timezone=America%2FMexico_City` +
      `&start_date=${WEEK[0].iso}&end_date=${WEEK[WEEK.length - 1].iso}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.daily?.temperature_2m_max?.length) { setStatus("soon"); return; }
        setForecast(
          WEEK.map((w, i) => ({
            ...w,
            icon: codeToIcon(data.daily.weathercode[i]),
            tMax: Math.round(data.daily.temperature_2m_max[i]),
            tMin: Math.round(data.daily.temperature_2m_min[i]),
            rain: data.daily.precipitation_probability_max[i] ?? 0,
          }))
        );
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  const WeatherGrid = ({ items }) => (
    <div className="inv-weather__grid">
      {items.map(({ day, date, icon, tMax, tMin, rain, wedding }) => (
        <div key={date} className={`inv-weather__day${wedding ? " inv-weather__day--wedding" : ""}`}>
          <span className="inv-weather__day-name">{day}</span>
          <span className="inv-weather__day-date">{date}</span>
          <span className="inv-weather__icon">{icon ?? "🌤️"}</span>
          <span className="inv-weather__temp">{tMax != null ? `${tMax}°` : "--°C"}</span>
          {tMin != null && <span className="inv-weather__temp-min">{tMin}°</span>}
          {rain != null && <span className="inv-weather__rain">💧 {rain}%</span>}
        </div>
      ))}
    </div>
  );

  const placeholderItems = WEEK.map((w) => ({ ...w, icon: "🌤️" }));

  return (
    <section ref={ref} className="inv-section inv-section--layer inv-weather">

      {/* Capa media: foto enmarcada con parallax */}
      <div className={`inv-layer__photo${!photoSrc ? " inv-layer__photo--empty" : ""}`}>
        {photoSrc && (
          <motion.div className="inv-layer__photo-inner" style={{ y }}>
            <img src={photoSrc} alt="" aria-hidden="true" />
          </motion.div>
        )}
      </div>

      {/* Capa frontal: tarjeta de contenido */}
      <div className="inv-layer__card">

        <InvReveal delay={0}>
          <p className="inv-section__label">Prepárate</p>
        </InvReveal>

        <InvReveal delay={0.1}>
          <h2>Clima de la Semana</h2>
        </InvReveal>

        <InvReveal delay={0.18}>
          <p className="inv-weather__note">
            Pronóstico para la semana del 21 de noviembre de 2026 · Cuernavaca
          </p>
        </InvReveal>

        {status === "loading" && (
          <p className="inv-weather__disclaimer">Cargando pronóstico...</p>
        )}

        <InvReveal delay={0.28}>
          {status === "ok" && forecast
            ? <WeatherGrid items={forecast} />
            : <WeatherGrid items={placeholderItems} />
          }
        </InvReveal>

        <InvReveal delay={0.38}>
          <p className="inv-weather__disclaimer">
            {status === "ok"
              ? "* Máx · Mín · Prob. lluvia · Fuente: Open-Meteo"
              : "* Pronóstico disponible próximamente"}
          </p>
        </InvReveal>

      </div>
    </section>
  );
}
