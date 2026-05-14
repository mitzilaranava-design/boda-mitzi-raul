import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

// Patrón de tamaños para el mosaico (se repite si hay más fotos)
const PATTERN = [
  { gridColumn: "span 2", gridRow: "span 2" }, // grande
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 2", gridRow: "span 1" }, // ancho
  { gridColumn: "span 1", gridRow: "span 2" }, // alto
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 2", gridRow: "span 1" }, // ancho
];

function getSpan(i, total) {
  if (total === 1) return { gridColumn: "span 3", gridRow: "span 2" };
  if (total === 2) return { gridColumn: i === 0 ? "span 2" : "span 1", gridRow: "span 2" };
  if (total === 3) return i === 0
    ? { gridColumn: "span 2", gridRow: "span 2" }
    : { gridColumn: "span 1", gridRow: "span 1" };
  return PATTERN[i % PATTERN.length] ?? { gridColumn: "span 1", gridRow: "span 1" };
}

export default function InvGallery() {
  const [activeIndex, setActiveIndex] = useState(null); // null | number
  const photos = WEDDING.gallery ?? [];

  const prev = useCallback(() =>
    setActiveIndex(i => (i - 1 + photos.length) % photos.length), [photos.length]);

  const next = useCallback(() =>
    setActiveIndex(i => (i + 1) % photos.length), [photos.length]);

  const close = useCallback(() => setActiveIndex(null), []);

  // Navegación con teclado
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, prev, next, close]);

  return (
    <>
      <motion.section className="inv-section inv-gallery" {...fadeUp}>
        <div className="inv-section__inner inv-section__inner--center">
          <p className="inv-section__label">Nuestros momentos</p>
          <h2 className="inv-gallery__title">Nuestra Galería</h2>
          <p className="inv-gallery__sub">de fotos</p>
          <span className="inv-gallery__ornament">✦ &nbsp; ✦ &nbsp; ✦</span>

          {photos.length === 0 ? (
            <div className="inv-gallery__empty">
              <span className="inv-gallery__empty-icon">🏗️</span>
              <p className="inv-gallery__empty-title">Galería en construcción</p>
              <p className="inv-gallery__empty-note">Próximamente nuestros momentos</p>
            </div>
          ) : (
            <div className="inv-gallery__mosaic">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className="inv-gallery__item"
                  style={getSpan(i, photos.length)}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="inv-gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          >
            {/* Imagen con key para re-animar al cambiar */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={photos[activeIndex]}
                alt={`Foto ${activeIndex + 1}`}
                className="inv-gallery__lightbox-img"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.18 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Botón cerrar */}
            <button
              type="button"
              className="inv-gallery__lightbox-close"
              onClick={close}
              aria-label="Cerrar foto"
            >
              ✕
            </button>

            {/* Contador */}
            <p className="inv-gallery__lightbox-counter">
              {activeIndex + 1} / {photos.length}
            </p>

            {/* Anterior */}
            {photos.length > 1 && (
              <button
                type="button"
                className="inv-gallery__lightbox-nav inv-gallery__lightbox-nav--prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Foto anterior"
              >
                ‹
              </button>
            )}

            {/* Siguiente */}
            {photos.length > 1 && (
              <button
                type="button"
                className="inv-gallery__lightbox-nav inv-gallery__lightbox-nav--next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Foto siguiente"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
