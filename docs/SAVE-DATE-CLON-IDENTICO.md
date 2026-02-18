# 💍 SAVE THE DATE — CLON 100% IDÉNTICO A INVITACIÓN BASE

Guía para replicar EXACTAMENTE los mismos colores, tipografías, imágenes, espaciados, overlays y estilo visual de una invitación base, cambiando solo el texto a:

**Mitzi & Raúl**  
**04 · Octubre · 2026**

---

## 1️⃣ Extraer estilos originales

Abrir la invitación base → Click derecho → Inspect. Copiar:

- font-family principal y secundaria
- colores HEX
- background-image
- overlay rgba
- tamaños de fuente, letter-spacing
- márgenes y paddings

Descargar imagen principal y guardarla en `public/assets/bg.jpg`.

---

## 2️⃣ Estructura de referencia

```
src/
├── SaveDate.jsx
├── SaveDate.module.css
public/
├── assets/bg.jpg
```

---

## 3️⃣ SaveDate.jsx (estructura)

- Container con overlay
- motion.div con fade-in
- SAVE THE DATE, nombres (Mitzi & Raúl), divider, fecha, mensaje

---

## 4️⃣ SaveDate.module.css

Pegar los valores reales de la invitación en:

- `.container` — background-image, cover, center
- `.overlay` — rgba (ej. 0,0,0,0.35)
- `.content` — color, max-width
- `.subtitle`, `.names`, `.divider`, `.date`, `.message` — font-family, font-size, letter-spacing

---

## 5️⃣ Checklist para clon idéntico

- [ ] Misma imagen exacta
- [ ] Mismos colores HEX
- [ ] Mismas fuentes cargadas
- [ ] Mismo espaciado
- [ ] Mismo overlay
- [ ] Misma animación

---

En **boda-mitzi-raul** se optó por el estilo casual (save-date-react: cream, dorado) en lugar del clon oscuro. Esta guía sirve si más adelante se quiere una vista “formal” idéntica a una invitación base.
