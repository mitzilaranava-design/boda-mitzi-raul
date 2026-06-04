import { motion } from "framer-motion";
import InvReveal from "../InvReveal";

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
    <section className="inv-section inv-passes">

      {/* Tarjeta con textura */}
      <div className="inv-passes__card">

        <InvReveal delay={0}>
          <h2 className="inv-passes__title">
            ¡Es un placer<br />invitarlos!
          </h2>
        </InvReveal>

        <InvReveal delay={0.12}>
          <p className="inv-passes__greeting">
            {invitado?.nombre}, con mucho cariño<br />
            les hacemos llegar su invitación
          </p>
        </InvReveal>

        <InvReveal delay={0.22}>
          <div className="inv-passes__count-wrap">
            <span className="inv-passes__count-num">
              {invitado?.num_invitados}
            </span>
            <span className="inv-passes__count-label">
              {invitado?.num_invitados === 1 ? "Pase" : "Pases"}
            </span>
          </div>
        </InvReveal>

        <InvReveal delay={0.32}>
          {/* ── Estado persistido en BD ── */}
          {invitado?.no_asiste ? (
            <motion.div
              className="passes-no-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Ya nos avisaste que no podrás acompañarnos. ¡Te deseamos lo mejor! 💛</p>
            </motion.div>

          ) : invitado?.confirmado && !invitado?.auto_confirmado ? (
            <motion.div
              className="passes-si-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="passes-si-msg__check">✓</span>
              <p>¡Tu asistencia ya está confirmada!</p>
              <small>
                {invitado.num_confirmados}{" "}
                {invitado.num_confirmados !== 1 ? "personas" : "persona"} · 21 de noviembre de 2026
              </small>
            </motion.div>

          ) : invitado?.auto_confirmado ? (
            <motion.div
              className="passes-no-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>El plazo para confirmar ha concluido. Si deseas aclarar tu asistencia, contáctanos directamente. 💛</p>
            </motion.div>

          ) : /* ── RSVP flow en vivo ── */
          confirmado ? (
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
        </InvReveal>

      </div>
    </section>
  );
}
