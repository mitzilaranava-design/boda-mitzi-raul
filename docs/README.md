# 📚 Documentación y contexto del proyecto

Esta carpeta contiene la documentación y el historial de decisiones del proyecto **Boda Mitzi & Raúl** para dar contexto a cualquiera que trabaje en el repo (o a la IA).

---

## Índice de documentos

| Archivo | Descripción |
|---------|-------------|
| **CAMBIOS-Y-REQUISITOS.txt** | Requisitos actuales, pendientes e ideas. Control compartido para 2 personas. |
| **PLAN-RESTRUCTURA-BODA.md** | Plan de reestructuración: comparativa save-date vs save-date-react, flujo de invitaciones, Supabase. |
| **PROMPT-SAVE-THE-DATE.md** | Contexto del Save the Date original (save-date), qué se hizo y qué faltaba. |
| **GUIA-SAVE-THE-DATE-REACT.md** | Guía técnica para una página Save the Date en React (concepto, stack, estructura). |
| **SAVE-DATE-CLON-IDENTICO.md** | Guía para clonar 100% una invitación base (estilos, fuentes, bg.jpg). |

---

## Flujo del proyecto

1. **Página pública** (`/`)  
   Save the Date: hero, countdown, botón “Agregar a calendario” (descarga .ics).

2. **Invitación personalizada** (`/inv/:id`)  
   El invitado llega por enlace (ej. WhatsApp). Ve su nombre, cupo y formulario para confirmar asistencia (cuántos van). Al confirmar se guarda en Supabase.

3. **Base de datos**  
   Supabase, tabla `invitados`. Sin `.env` el front usa datos mock.

4. **Control de cambios**  
   `CHANGELOG.md` en la raíz del proyecto; requisitos vivos en `docs/CAMBIOS-Y-REQUISITOS.txt`.

---

## Para dar contexto a la IA

Incluir en el prompt algo como:

> "Proyecto boda-mitzi-raul: invitaciones de boda con confirmación. Revisa docs/ para contexto: PLAN-RESTRUCTURA-BODA.md (flujo y estructura), CAMBIOS-Y-REQUISITOS.txt (pendientes). CHANGELOG.md en la raíz para historial de cambios."
