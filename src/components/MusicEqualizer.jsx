import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Reproductor mínimo: solo rayitas (equalizer). Minimizable a un botón pequeño.
 * Reproduce en automático al cargar y en loop.
 */
export default function MusicEqualizer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  // Reproducción automática al cargar y cuando el usuario interactúa por primera vez
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    const playAudio = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    // Intentar reproducir cuando el audio esté listo
    if (audio.readyState >= 2) {
      playAudio();
    } else {
      audio.addEventListener("canplay", playAudio, { once: true });
    }

    // También intentar reproducir cuando el usuario interactúe con la página (click, scroll, touch)
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, { once: true });
    document.addEventListener("scroll", handleUserInteraction, { once: true });

    return () => {
      audio.removeEventListener("canplay", playAudio);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, [src]);

  const togglePlay = (e) => {
    e?.stopPropagation?.();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!src) return null;

  return (
    <div className="music-equalizer-wrap">
      <audio ref={audioRef} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)}>
        <source src={src} type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            className="music-equalizer-panel"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="music-equalizer-panel__minimize"
              onClick={() => setIsExpanded(false)}
              aria-label="Minimizar"
              title="Minimizar"
            >
              −
            </button>
            <button
              type="button"
              className={`music-equalizer ${isPlaying ? "music-equalizer--playing" : ""}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              <span className="music-equalizer__bar" style={{ animationDelay: "0ms" }} />
              <span className="music-equalizer__bar" style={{ animationDelay: "150ms" }} />
              <span className="music-equalizer__bar" style={{ animationDelay: "50ms" }} />
              <span className="music-equalizer__bar" style={{ animationDelay: "250ms" }} />
              <span className="music-equalizer__bar" style={{ animationDelay: "100ms" }} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            type="button"
            className="music-equalizer-btn"
            onClick={() => setIsExpanded(true)}
            aria-label="Abrir reproductor de música"
            title="Música"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="music-equalizer-btn__icon">♪</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
