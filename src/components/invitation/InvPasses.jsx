import { motion } from "framer-motion";
import { fadeUp } from "../../data/wedding";

export default function InvPasses({
  invitado,
  respuesta,
  setRespuesta,
  numAsistentes,
  setNumAsistentes,
  confirmado,
  confirmando,
  onConfirmar,
  onRechazar,
}) {
  return (
    <motion.section className="inv-section inv-passes" {...fadeUp}>

      {/* Tarjeta con textura */}
      <div className="inv-passes__card">

        <h2 className="inv-passes__title">
          ¡Es un placer<br />invitarlos!
        </h2>

        <p className="inv-passes__greeting">
          {invitado?.nombre}, con mucho cariño<br />
          les hacemos llegar su invitación
        </p>

        <div className="inv-passes__count-wrap">
          <span className="inv-passes__count-num">
            {invitado?.num_invitados}
          </span>
          <span className="inv-passes__count-label">
            {invitado?.num_invitados === 1 ? "Pase" : "Pases"}
          </span>
        </div>

        {/* ── RSVP flow ── */}
        {confirmado ? (
          <motion.div
            className={respuesta === "no" ? "passes-no-msg" : "passes-si-msg"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {respuesta === "no" ? (
              <p>Gracias por avisarnos. Lamentamos que no puedas acompañarnos.</p>
            ) : (
              <>
                <span className="passes-si-msg__check">✓</span>
                <p>¡Asistencia confirmada!</p>
                <small>
                  {numAsistentes} {numAsistentes === 1 ? "persona" : "personas"}
                </small>
              </>
            )}
          </motion.div>

        ) : respuesta === null ? (
          <div className="passes-pregunta">
            <motion.button
              className="passes-btn passes-btn--si"
              onClick={() => setRespuesta("si")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirmar asistencia
            </motion.button>
            <motion.button
              className="passes-btn--link"
              onClick={() => setRespuesta("no")}
              whileHover={{ opacity: 0.6 }}
              whileTap={{ scale: 0.97 }}
            >
              No podré asistir
            </motion.button>
          </div>

        ) : respuesta === "si" ? (
          <div className="passes-confirm-form">
            <label className="passes-confirm-form__label">
              ¿Cuántas personas asistirán?
            </label>
            <select
              className="passes-confirm-form__select"
              value={numAsistentes}
              onChange={(e) => setNumAsistentes(Number(e.target.value))}
            >
              {Array.from(
                { length: invitado?.num_invitados || 1 },
                (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i === 0 ? "persona" : "personas"}
                  </option>
                )
              )}
            </select>
            <motion.button
              className="passes-btn passes-btn--si"
              onClick={onConfirmar}
              disabled={confirmando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {confirmando ? "Confirmando..." : "Confirmar asistencia"}
            </motion.button>
          </div>

        ) : (
          <div className="passes-confirm-form">
            <p className="passes-no-aviso">
              Lamentamos que no puedas acompañarnos.
            </p>
            <motion.button
              className="passes-btn passes-btn--si"
              onClick={onRechazar}
              disabled={confirmando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {confirmando ? "Registrando..." : "Confirmar que no asistiré"}
            </motion.button>
          </div>
        )}

      </div>
    </motion.section>
  );
}
