import { createContext } from "react";

// Ref al contenedor de scroll (.app.inv)
// Permite useScroll de Framer Motion y viewport root en whileInView
export const InvScrollContext = createContext({ current: null });
