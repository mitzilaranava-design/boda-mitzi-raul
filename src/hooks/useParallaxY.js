import { useRef, useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Parallax para secciones con foto de fondo.
 * Devuelve { ref, y } — ref va en <section>, y en el motion.div inner de la foto.
 * Funciona aunque el scroll sea de .app.inv y no del window.
 */
export function useParallaxY(amount = 40) {
  const sectionRef = useRef(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const container = document.querySelector(".app.inv");
    if (!container) return;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const cRect = container.getBoundingClientRect();
      const sRect = section.getBoundingClientRect();

      const sRelTop = sRect.top - cRect.top;
      const total   = sRect.height + container.clientHeight;
      const progress = 1 - (sRelTop + sRect.height) / total; // 0 → 1

      y.set((progress * 2 - 1) * amount);
    };

    container.addEventListener("scroll", update, { passive: true });
    update();
    return () => container.removeEventListener("scroll", update);
  }, [amount, y]);

  return { ref: sectionRef, y };
}
