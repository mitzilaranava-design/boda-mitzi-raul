import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { guardarGrupo } from "../../api/pases";

function StatusPill({ inv }) {
  const [bg, label] = inv.auto_confirmado
    ? ["#6b7280", "Auto-confirmado"]
    : inv.no_asiste
    ? ["#9ca3af", "No asiste"]
    : inv.confirmado
    ? ["#16a34a", "Confirmado ✓"]
    : ["#b49b6b", "Pendiente"];
  return (
    <span style={{ background: bg, color: "#fff", padding: "2px 10px", borderRadius: 99, fontSize: 11, fontFamily: "Poppins, sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

const TIPOS = [
  { value: "adulto_hombre", label: "Adulto ♂" },
  { value: "adulto_mujer", label: "Adulta ♀" },
  { value: "nino", label: "Niño" },
  { value: "nina", label: "Niña" },
];

const TIPO_EMOJI = {
  adulto_hombre: "👨",
  adulto_mujer: "👩",
  nino: "👦",
  nina: "👧",
};

const POR_PAGINA = 7;

function inputStyle(extra = {}) {
  return {
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    padding: "8px 12px",
    border: "1px solid #e8dcc8",
    borderRadius: 8,
    background: "#fff",
    color: "#222",
    outline: "none",
    minHeight: 40,
    ...extra,
  };
}

function ModalGrupo({ invitado, pasesExistentes, onGuardar, onCerrar }) {
  const maxPersonas = invitado.confirmado
    ? (invitado.num_confirmados ?? invitado.num_invitados)
    : (invitado.num_invitados ?? 1);

  const [personas, setPersonas] = useState(() => {
    if (pasesExistentes.length > 0) {
      return pasesExistentes.map((p) => ({ nombre: p.nombre, tipo: p.tipo }));
    }
    return [{ nombre: invitado.nombre, tipo: "adulto_hombre" }];
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const agregar = () => {
    if (personas.length >= maxPersonas) return;
    setPersonas((prev) => [...prev, { nombre: "", tipo: "adulto_hombre" }]);
  };

  const actualizar = (i, campo, valor) =>
    setPersonas((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p))
    );

  const quitar = (i) =>
    setPersonas((prev) => prev.filter((_, idx) => idx !== i));

  const handleGuardar = async () => {
    const validas = personas.filter((p) => p.nombre.trim());
    if (validas.length === 0) return;
    setGuardando(true);
    setError(null);
    try {
      const result = await guardarGrupo(invitado.id, validas);
      onGuardar(invitado.id, result);
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  };

  const valido = personas.some((p) => p.nombre.trim());

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onCerrar}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.18 }}
        style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", width: "100%", maxWidth: 480, maxHeight: "85dvh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ margin: "0 0 4px", fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#222", fontWeight: 600 }}>
          Integrantes del grupo
        </p>
        <p style={{ margin: "0 0 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#aaa" }}>
          {invitado.nombre} · {invitado.num_invitados} pase{invitado.num_invitados !== 1 ? "s" : ""}
        </p>

        {/* Lista de personas scrollable */}
        <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
          {personas.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#bbb", minWidth: 18, textAlign: "center" }}>
                {i + 1}
              </span>
              <input
                type="text"
                value={p.nombre}
                onChange={(e) => actualizar(i, "nombre", e.target.value)}
                placeholder="Nombre"
                style={{ ...inputStyle(), flex: 1 }}
              />
              <select
                value={p.tipo}
                onChange={(e) => actualizar(i, "tipo", e.target.value)}
                style={{ ...inputStyle(), minWidth: 100 }}
              >
                {TIPOS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <button
                onClick={() => quitar(i)}
                disabled={personas.length === 1}
                style={{
                  background: "none",
                  border: "none",
                  color: personas.length === 1 ? "#ddd" : "#9ca3af",
                  cursor: personas.length === 1 ? "default" : "pointer",
                  fontSize: 18,
                  lineHeight: 1,
                  padding: "0 4px",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Agregar */}
        <button
          onClick={agregar}
          disabled={personas.length >= maxPersonas}
          style={{
            marginTop: 12,
            background: "none",
            border: `1px dashed ${personas.length >= maxPersonas ? "#e5e7eb" : "#e8dcc8"}`,
            borderRadius: 8,
            padding: "8px 16px",
            fontFamily: "Poppins, sans-serif",
            fontSize: 13,
            color: personas.length >= maxPersonas ? "#ccc" : "#b49b6b",
            cursor: personas.length >= maxPersonas ? "default" : "pointer",
            textAlign: "left",
          }}
        >
          {personas.length >= maxPersonas
            ? `Límite alcanzado (${maxPersonas} pase${maxPersonas !== 1 ? "s" : ""})`
            : `+ Agregar persona (${personas.length}/${maxPersonas})`}
        </button>

        {error && (
          <p style={{ margin: "8px 0 0", fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#e53e3e" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            onClick={onCerrar}
            disabled={guardando}
            style={{ background: "#f3f4f6", color: "#555", border: "none", borderRadius: 8, padding: "10px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: guardando ? "default" : "pointer", minHeight: 44 }}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={!valido || guardando}
            style={{ flex: 1, background: !valido || guardando ? "#e5e7eb" : "#b49b6b", color: !valido || guardando ? "#9ca3af" : "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 500, cursor: !valido || guardando ? "default" : "pointer", minHeight: 44 }}
          >
            {guardando ? "Guardando..." : "Guardar grupo"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function TabDetalles({ invitados, pases, onGuardarGrupo }) {
  const [modalInvitado, setModalInvitado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const handleGuardar = useCallback(
    (invitado_id, nuevosPases) => {
      onGuardarGrupo(invitado_id, nuevosPases);
      setModalInvitado(null);
    },
    [onGuardarGrupo]
  );

  // Stats
  const adHombres = pases.filter((p) => p.tipo === "adulto_hombre").length;
  const adMujeres = pases.filter((p) => p.tipo === "adulto_mujer").length;
  const ninos = pases.filter((p) => p.tipo === "nino").length;
  const ninas = pases.filter((p) => p.tipo === "nina").length;
  const conGrupo = new Set(pases.map((p) => p.invitado_id)).size;
  const sinGrupo = invitados.filter((inv) => !pases.some((p) => p.invitado_id === inv.id)).length;

  // Solo invitados activos que asisten
  const activos = invitados.filter((i) => i.enviar_save_the_date && !i.no_asiste);

  // Filter + paginate
  const query = busqueda.trim().toLowerCase();
  const filtrados = query
    ? activos.filter((i) => i.nombre.toLowerCase().includes(query))
    : activos;
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const pagina_ = Math.min(pagina, totalPaginas || 1);
  const paginados = filtrados.slice((pagina_ - 1) * POR_PAGINA, pagina_ * POR_PAGINA);

  const pasesModal = modalInvitado
    ? pases.filter((p) => p.invitado_id === modalInvitado.id)
    : [];

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "👨 Adultos ♂", value: adHombres, color: "#3b82f6" },
          { label: "👩 Adultas ♀", value: adMujeres, color: "#ec4899" },
          { label: "👦 Niños", value: ninos + ninas, color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total registradas", value: pases.length, color: "#222" },
          { label: "Inv. con grupo", value: conGrupo, color: "#16a34a" },
          { label: "Inv. sin grupo", value: sinGrupo, color: "#b49b6b" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar invitado..."
        value={busqueda}
        onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px 16px",
          fontFamily: "Poppins, sans-serif",
          fontSize: 14,
          border: "1px solid #e8dcc8",
          borderRadius: 10,
          outline: "none",
          marginBottom: 12,
          background: "#fff",
        }}
      />

      {/* Lista */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {paginados.map((inv) => {
          const grupo = pases.filter((p) => p.invitado_id === inv.id);
          const tieneGrupo = grupo.length > 0;
          return (
            <div
              key={inv.id}
              style={{ background: "#fff", border: `1px solid ${tieneGrupo ? "#e8dcc8" : "#f0e8d5"}`, borderRadius: 10, padding: "14px 16px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#222", fontWeight: 600 }}>
                      {inv.nombre}
                    </p>
                    <StatusPill inv={inv} />
                  </div>
                  <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#888", marginTop: 4 }}>
                    {inv.num_invitados} pase{inv.num_invitados !== 1 ? "s" : ""}
                    {inv.confirmado && !inv.no_asiste ? ` · Confirman ${inv.num_confirmados}` : ""}
                    {tieneGrupo
                      ? ` · ${grupo.length} registrado${grupo.length !== 1 ? "s" : ""}`
                      : " · Sin registrar"}
                  </p>
                </div>
                <button
                  onClick={() => setModalInvitado(inv)}
                  style={{
                    background: tieneGrupo ? "#f9f5ef" : "#b49b6b",
                    color: tieneGrupo ? "#b49b6b" : "#fff",
                    border: `1px solid ${tieneGrupo ? "#e8dcc8" : "#b49b6b"}`,
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    minHeight: 36,
                    flexShrink: 0,
                  }}
                >
                  {tieneGrupo ? "Editar grupo" : "Registrar"}
                </button>
              </div>

              {/* Chips de personas */}
              {tieneGrupo && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                  {grupo.map((p) => (
                    <span
                      key={p.id}
                      style={{
                        background: "#f9f5ef",
                        border: "1px solid #e8dcc8",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: 12,
                        color: "#555",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {TIPO_EMOJI[p.tipo]} {p.nombre}
                      {p.mesa && (
                        <span style={{ color: "#b49b6b", marginLeft: 2 }}>· M{p.mesa}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Paginador */}
      {totalPaginas > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina_ === 1}
            style={{ background: pagina_ === 1 ? "#e5e7eb" : "#b49b6b", color: pagina_ === 1 ? "#9ca3af" : "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: pagina_ === 1 ? "default" : "pointer", minHeight: 44 }}
          >
            ← Anterior
          </button>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#555" }}>
            {pagina_} / {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina_ === totalPaginas}
            style={{ background: pagina_ === totalPaginas ? "#e5e7eb" : "#b49b6b", color: pagina_ === totalPaginas ? "#9ca3af" : "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: pagina_ === totalPaginas ? "default" : "pointer", minHeight: 44 }}
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalInvitado && (
          <ModalGrupo
            invitado={modalInvitado}
            pasesExistentes={pasesModal}
            onGuardar={handleGuardar}
            onCerrar={() => setModalInvitado(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
