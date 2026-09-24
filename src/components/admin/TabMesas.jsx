import { useState, useCallback, useEffect, useRef } from "react";
import { asignarMesaPase } from "../../api/pases";
import { getMesas, saveMesas } from "../../api/mesas";

const TOTAL_MESAS = 20;
const ASIENTOS = 12;

const TIPO_EMOJI = {
  adulto_hombre: "👨",
  adulto_mujer:  "👩",
  nino:          "👦",
  nina:          "👧",
};

const TIPO_MESA = [
  { value: "redonda",     label: "⬤ Redonda"     },
  { value: "cuadrada",    label: "■ Cuadrada"    },
  { value: "rectangular", label: "▬ Rectangular" },
];

const TIPO_MESA_LABEL = { redonda: "Redonda", cuadrada: "Cuadrada", rectangular: "Rectangular" };

function initMesasMeta() {
  const m = {};
  for (let i = 1; i <= TOTAL_MESAS; i++) m[i] = { nombre: "", tipo: "redonda" };
  return m;
}

function mesaLabel(num, meta) {
  return meta[num]?.nombre?.trim() || `Mesa ${num}`;
}

// ── Barra de capacidad ────────────────────────────────────────────────────────
function CapacidadBar({ ocupados }) {
  const pct   = Math.min(100, Math.round((ocupados / ASIENTOS) * 100));
  const color = ocupados > ASIENTOS ? "#e53e3e" : ocupados >= 10 ? "#f59e0b" : "#16a34a";
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#888" }}>
          {ocupados}/{ASIENTOS}
        </span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color }}>
          {ocupados > ASIENTOS ? `+${ocupados - ASIENTOS} excede` : `${ASIENTOS - ocupados} libres`}
        </span>
      </div>
      <div style={{ height: 5, background: "#f0e8d5", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

// ── Reporte: Lista de invitados ───────────────────────────────────────────────
function abrirReporteInvitados(invitados, pases, mesasMeta) {
  const invOrdenados = [...invitados]
    .filter((inv) => inv.enviar_save_the_date && !inv.no_asiste)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

  const filas = invOrdenados.map((inv, idx) => {
    const pasesInv = pases.filter((p) => p.invitado_id === inv.id);
    const adultos  = pasesInv.filter((p) => p.tipo === "adulto_hombre" || p.tipo === "adulto_mujer").length;
    const ninos    = pasesInv.filter((p) => p.tipo === "nino" || p.tipo === "nina").length;
    const mesaNums = [...new Set(pasesInv.map((p) => p.mesa).filter(Boolean))].sort((a, b) => a - b);
    const mesaStr  = mesaNums.length > 0
      ? mesaNums.map((n) => mesaLabel(n, mesasMeta)).join(" / ")
      : "—";
    const c = idx % 2 === 0 ? "#fff" : "#fafaf8";
    return `<tr style="background:${c}">
      <td style="text-align:center">${idx + 1}</td>
      <td><strong>${inv.nombre}</strong></td>
      <td>${inv.celular ?? ""}</td>
      <td style="text-align:center">${inv.num_invitados ?? ""}</td>
      <td></td>
      <td style="text-align:center">${mesaStr}</td>
      <td style="text-align:center">${adultos || "—"}</td>
      <td style="text-align:center">${ninos || "—"}</td>
      <td style="text-align:center">${inv.num_confirmados ?? ""}</td>
      <td style="text-align:center;font-weight:600;color:${inv.confirmado ? "#16a34a" : "#e53e3e"}">${inv.confirmado ? "SI" : "NO"}</td>
      <td></td>
      <td style="color:#888">${inv.nombre}</td>
    </tr>`;
  }).join("");

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Lista de invitados — Mitzi &amp; Raúl</title>
<style>
  body{font-family:Arial,sans-serif;padding:28px;color:#222;max-width:1200px;margin:0 auto;font-size:12px}
  h1{font-family:Georgia,serif;font-size:22px;text-align:center;margin:0 0 2px}
  .sub{text-align:center;color:#888;font-size:11px;margin:0 0 6px}
  .total{text-align:center;font-size:13px;font-weight:600;color:#b49b6b;margin:0 0 18px;letter-spacing:0.5px}
  table{width:100%;border-collapse:collapse}
  th{background:#f9f5ef;padding:7px 8px;text-align:left;border-bottom:2px solid #e8dcc8;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#b49b6b;white-space:nowrap}
  th.center{text-align:center}
  td{padding:5px 8px;border-bottom:1px solid #f0eee8;vertical-align:middle}
  .footer{margin-top:16px;text-align:center;font-size:10px;color:#bbb}
  @media print{body{padding:10px}@page{size:landscape}}
</style></head><body>
<h1>Mitzi &amp; Raúl</h1>
<p class="sub">Lista de invitados · 21 de noviembre de 2026</p>
<p class="total">Número de Invitados: ${invOrdenados.length}</p>
<table>
  <thead><tr>
    <th class="center">#</th><th>Invitado</th><th>Teléfono Celular</th>
    <th class="center">Núm. de Personas</th><th>Parentesco</th>
    <th class="center">Mesa</th><th class="center">Adulto</th>
    <th class="center">Niño</th><th class="center">Confirmado</th>
    <th class="center">SI / NO</th><th>Observaciones</th><th>Invitación</th>
  </tr></thead>
  <tbody>${filas}</tbody>
</table>
<p class="footer">
  Generado el ${new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })} ·
  ${invOrdenados.filter((i) => i.confirmado).length} confirmados de ${invOrdenados.length}
</p>
</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

// ── Reporte: Plan de mesas ────────────────────────────────────────────────────
function abrirReporte(invitados, pases, mesasMeta) {
  const invMap    = Object.fromEntries(invitados.map((i) => [i.id, i.nombre]));
  const mesasData = Array.from({ length: TOTAL_MESAS }, (_, i) => {
    const num      = i + 1;
    const personas = pases.filter((p) => p.mesa === num);
    const nombre   = mesaLabel(num, mesasMeta);
    const tipo     = TIPO_MESA_LABEL[mesasMeta[num]?.tipo] ?? "Redonda";
    return { num, nombre, tipo, personas };
  });
  const sinAsignar = pases.filter((p) => !p.mesa);

  const filas = mesasData.map(({ num, nombre, tipo, personas }) => {
    if (personas.length === 0)
      return `<tr>
        <td style="font-weight:600;padding:8px 12px;border-bottom:1px solid #f0e8d5">${nombre}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#bbb;font-size:11px">${tipo}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">—</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">—</td>
        <td style="text-align:center;padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">0/${ASIENTOS}</td>
      </tr>`;
    const libres = ASIENTOS - personas.length;
    return personas.map((p, idx) =>
      `<tr>
        ${idx === 0 ? `<td rowspan="${personas.length}" style="font-weight:600;padding:8px 12px;border-bottom:2px solid #e8dcc8;vertical-align:top">${nombre}</td>
        <td rowspan="${personas.length}" style="padding:8px 12px;border-bottom:2px solid #e8dcc8;vertical-align:top;color:#888;font-size:11px">${tipo}</td>` : ""}
        <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5">${p.nombre}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888">${TIPO_EMOJI[p.tipo] ?? ""} ${p.tipo.replace("_", " ")}</td>
        ${idx === 0 ? `<td rowspan="${personas.length}" style="text-align:center;padding:8px 12px;border-bottom:2px solid #e8dcc8;vertical-align:middle;color:${libres < 0 ? "#e53e3e" : "#16a34a"};font-weight:600">${personas.length}/${ASIENTOS}</td>` : ""}
      </tr>`
    ).join("");
  }).join("");

  const filasSin = sinAsignar.map((p) =>
    `<tr style="background:#fff8f0">
      <td style="color:#b49b6b;padding:6px 12px;border-bottom:1px solid #f5f5f5">Sin asignar</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#bbb;font-size:11px">—</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5">${p.nombre}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888">${TIPO_EMOJI[p.tipo] ?? ""} ${p.tipo.replace("_", " ")}</td>
      <td style="text-align:center;padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#9ca3af">—</td>
    </tr>`
  ).join("");

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Plan de mesas — Mitzi &amp; Raúl</title>
<style>
  body{font-family:Georgia,serif;padding:32px;color:#222;max-width:960px;margin:0 auto}
  h1{font-size:26px;text-align:center;margin:0 0 4px}
  .sub{text-align:center;color:#888;font-size:13px;font-family:Arial,sans-serif;margin:0 0 24px}
  table{width:100%;border-collapse:collapse;font-size:13px;font-family:Arial,sans-serif}
  th{background:#f9f5ef;padding:10px 12px;text-align:left;border-bottom:2px solid #e8dcc8;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#b49b6b}
  .footer{margin-top:20px;text-align:center;font-size:11px;color:#bbb;font-family:Arial,sans-serif}
  @media print{body{padding:12px}}
</style></head><body>
<h1>Mitzi &amp; Raúl</h1>
<p class="sub">Plan de mesas · 21 de noviembre de 2026 · ${TOTAL_MESAS} mesas · ${ASIENTOS} asientos c/u</p>
<table>
  <thead><tr>
    <th>Mesa</th><th>Tipo</th><th>Persona</th><th>Tipo persona</th><th style="text-align:center">Ocupación</th>
  </tr></thead>
  <tbody>${filas}${filasSin}</tbody>
</table>
<p class="footer">${pases.filter((p) => p.mesa).length} personas asignadas · ${sinAsignar.length} sin asignar</p>
</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

// ── Estilos reutilizables ─────────────────────────────────────────────────────
const selectMesaStyle = {
  fontFamily: "Poppins, sans-serif",
  fontSize: 12,
  padding: "5px 8px",
  border: "1px solid #e8dcc8",
  borderRadius: 8,
  background: "#fff",
  color: "#222",
  minHeight: 34,
  cursor: "pointer",
  outline: "none",
  flexShrink: 0,
};

const tabBtn = (active) => ({
  background: active ? "#b49b6b" : "#fff",
  color: active ? "#fff" : "#888",
  border: "1px solid",
  borderColor: active ? "#b49b6b" : "#e8dcc8",
  borderRadius: 99,
  padding: "8px 20px",
  fontFamily: "Poppins, sans-serif",
  fontSize: 13,
  cursor: "pointer",
  fontWeight: 500,
  minHeight: 40,
});

// ── Componente principal ──────────────────────────────────────────────────────
export default function TabMesas({ invitados, pases, onMesaChange }) {
  const [vista,      setVista]      = useState("asignacion");
  const [guardando,  setGuardando]  = useState({});

  // Metadatos de mesas (nombre, tipo)
  const [mesasMeta,  setMesasMeta]  = useState(initMesasMeta);
  const [metaDirty,  setMetaDirty]  = useState(false);
  const [savingMeta, setSavingMeta] = useState(false);

  // Drag & drop
  const dragPaseId = useRef(null);
  const [dragOver, setDragOver] = useState(null); // número de mesa o "sin-asignar"

  const invMap = Object.fromEntries(invitados.map((i) => [i.id, i]));

  // Cargar metadatos de Supabase al montar
  useEffect(() => {
    getMesas()
      .then((rows) => {
        setMesasMeta((prev) => {
          const next = { ...prev };
          rows.forEach(({ num, nombre, tipo }) => {
            next[num] = { nombre: nombre ?? "", tipo: tipo ?? "redonda" };
          });
          return next;
        });
      })
      .catch(console.error);
  }, []);

  // Pases de invitados activos que asisten
  const pasesActivos = pases.filter((p) => {
    const inv = invMap[p.invitado_id];
    return inv?.enviar_save_the_date && !inv?.no_asiste;
  });

  // ── Asignar mesa (select y drop) ─────────────────────────────────────────
  const handleCambiar = useCallback(
    async (id, valor) => {
      const mesa = valor === "" ? null : Number(valor);
      setGuardando((prev) => ({ ...prev, [id]: true }));
      try {
        await asignarMesaPase(id, mesa);
        onMesaChange(id, mesa);
      } finally {
        setGuardando((prev) => ({ ...prev, [id]: false }));
      }
    },
    [onMesaChange]
  );

  // ── Drag & drop ──────────────────────────────────────────────────────────
  const canDrop = (targetMesa) => {
    const paseId = dragPaseId.current;
    if (!paseId) return true;
    const pase = pasesActivos.find((p) => p.id === paseId);
    if (!pase) return true;
    if (pase.mesa === targetMesa) return true; // misma mesa, no cambia el conteo
    return pasesActivos.filter((p) => p.mesa === targetMesa).length < ASIENTOS;
  };

  const handleDragStart = (e, paseId) => {
    dragPaseId.current = paseId;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, target) => {
    e.preventDefault();
    setDragOver(target);
    e.dataTransfer.dropEffect =
      target === "sin-asignar" || canDrop(target) ? "move" : "none";
  };

  const handleDrop = async (e, target) => {
    e.preventDefault();
    setDragOver(null);
    const paseId = dragPaseId.current;
    dragPaseId.current = null;
    if (!paseId) return;

    const pase = pasesActivos.find((p) => p.id === paseId);
    if (!pase) return;

    if (target === "sin-asignar") {
      if (pase.mesa === null) return;
      await handleCambiar(paseId, "");
      return;
    }

    if (pase.mesa === target) return;
    if (!canDrop(target)) return;
    await handleCambiar(paseId, String(target));
  };

  const handleDragEnd = () => {
    setDragOver(null);
    dragPaseId.current = null;
  };

  // ── Metadatos de mesas ───────────────────────────────────────────────────
  const handleMetaChange = (num, field, value) => {
    setMesasMeta((prev) => ({
      ...prev,
      [num]: { ...prev[num], [field]: value },
    }));
    setMetaDirty(true);
  };

  const handleSaveMetas = async () => {
    setSavingMeta(true);
    try {
      const toSave = Object.entries(mesasMeta).map(([num, { nombre, tipo }]) => ({
        num: Number(num),
        nombre: nombre.trim() || null,
        tipo,
      }));
      await saveMesas(toSave);
      setMetaDirty(false);
    } catch (err) {
      console.error("Error guardando mesas:", err);
    } finally {
      setSavingMeta(false);
    }
  };

  // ── Datos derivados ──────────────────────────────────────────────────────
  const pasesOrdenados = [...pasesActivos].sort((a, b) => {
    if (a.mesa && b.mesa) return a.mesa - b.mesa;
    if (a.mesa) return -1;
    if (b.mesa) return 1;
    return (a.nombre ?? "").localeCompare(b.nombre ?? "");
  });

  const grupos = invitados
    .filter((inv) => inv.enviar_save_the_date && !inv.no_asiste)
    .map((inv) => ({
      inv,
      personas: pasesOrdenados.filter((p) => p.invitado_id === inv.id),
    }))
    .filter((g) => g.personas.length > 0);

  const mesasData = Array.from({ length: TOTAL_MESAS }, (_, i) => {
    const num      = i + 1;
    const personas = pasesActivos.filter((p) => p.mesa === num);
    return { num, personas };
  });

  const sinAsignar = pasesActivos.filter((p) => !p.mesa);
  const asignados  = pasesActivos.filter((p) => p.mesa).length;

  if (pasesActivos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#bbb", margin: "0 0 8px" }}>
          Sin personas registradas
        </p>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#ccc" }}>
          Ve a la pestaña Detalles para registrar los integrantes de cada invitación.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button style={tabBtn(vista === "asignacion")} onClick={() => setVista("asignacion")}>
          Asignación
        </button>
        <button style={tabBtn(vista === "reporte")} onClick={() => setVista("reporte")}>
          Vista por mesa
        </button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {vista === "reporte" && (
            <button
              onClick={handleSaveMetas}
              disabled={!metaDirty || savingMeta}
              style={{
                background: metaDirty ? "#b49b6b" : "#f9f5ef",
                color: metaDirty ? "#fff" : "#ccc",
                border: `1px solid ${metaDirty ? "#b49b6b" : "#e8dcc8"}`,
                borderRadius: 99,
                padding: "8px 16px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                cursor: metaDirty ? "pointer" : "default",
                minHeight: 40,
                transition: "all 0.2s",
              }}
            >
              {savingMeta ? "Guardando…" : metaDirty ? "💾 Guardar cambios" : "✓ Guardado"}
            </button>
          )}
          <button
            onClick={() => abrirReporteInvitados(invitados, pasesActivos, mesasMeta)}
            style={{ background: "#f9f5ef", color: "#b49b6b", border: "1px solid #e8dcc8", borderRadius: 99, padding: "8px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: "pointer", minHeight: 40 }}
          >
            Lista invitados
          </button>
          <button
            onClick={() => abrirReporte(invitados, pasesActivos, mesasMeta)}
            style={{ background: "#f9f5ef", color: "#b49b6b", border: "1px solid #e8dcc8", borderRadius: 99, padding: "8px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: "pointer", minHeight: 40 }}
          >
            Plan de mesas
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total personas",    value: pasesActivos.length, color: "#222"    },
          { label: "Asignadas",         value: asignados,           color: "#16a34a" },
          { label: "Sin asignar",       value: sinAsignar.length,   color: "#b49b6b" },
          { label: "Grupos registrados",value: grupos.length,       color: "#9d8558" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Vista: Asignación ── */}
      {vista === "asignacion" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {grupos.map(({ inv, personas }) => (
            <div key={inv.id} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#222", fontWeight: 600 }}>
                {inv.nombre}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {personas.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{TIPO_EMOJI[p.tipo]}</span>
                    <span style={{ flex: 1, fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.nombre}
                    </span>
                    {p.mesa && (
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#b49b6b", background: "#f9f5ef", borderRadius: 99, padding: "2px 8px", flexShrink: 0 }}>
                        {mesaLabel(p.mesa, mesasMeta)}
                      </span>
                    )}
                    <select
                      value={p.mesa ?? ""}
                      onChange={(e) => handleCambiar(p.id, e.target.value)}
                      disabled={!!guardando[p.id]}
                      style={{ ...selectMesaStyle, opacity: guardando[p.id] ? 0.5 : 1 }}
                    >
                      <option value="">—</option>
                      {Array.from({ length: TOTAL_MESAS }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {mesaLabel(i + 1, mesasMeta)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Vista: Por mesa — drag & drop ── */}
      {vista === "reporte" && (
        <div>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#bbb", marginBottom: 12, marginTop: 0 }}>
            Arrastra personas entre mesas · Edita el nombre y tipo de cada mesa · Guarda los cambios con el botón de arriba
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {mesasData.map(({ num, personas }) => {
              const isOver   = dragOver === num;
              const blocked  = isOver && !canDrop(num);
              const excede   = personas.length > ASIENTOS;
              const borderColor = blocked ? "#feb2b2" : isOver ? "#b49b6b" : excede ? "#feb2b2" : "#e8dcc8";

              return (
                <div
                  key={num}
                  onDragOver={(e) => handleDragOver(e, num)}
                  onDrop={(e) => handleDrop(e, num)}
                  onDragLeave={() => setDragOver(null)}
                  style={{
                    background: isOver && !blocked ? "#fffdf8" : "#fff",
                    border: `${isOver ? "2px" : "1px"} solid ${borderColor}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                    transition: "border-color 0.15s, background 0.15s",
                    minHeight: 80,
                  }}
                >
                  {/* Header: nombre + tipo */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <input
                      value={mesasMeta[num].nombre}
                      placeholder={`Mesa ${num}`}
                      onChange={(e) => handleMetaChange(num, "nombre", e.target.value)}
                      onFocus={(e)  => { e.target.style.borderBottomColor = "#b49b6b"; }}
                      onBlur={(e)   => { e.target.style.borderBottomColor = "transparent"; }}
                      style={{
                        flex: 1,
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#222",
                        border: "none",
                        borderBottom: "1px solid transparent",
                        padding: "2px 2px",
                        background: "transparent",
                        outline: "none",
                        transition: "border-color 0.15s",
                        minWidth: 0,
                      }}
                    />
                    <select
                      value={mesasMeta[num].tipo}
                      onChange={(e) => handleMetaChange(num, "tipo", e.target.value)}
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: 10,
                        color: "#888",
                        border: "1px solid #e8dcc8",
                        borderRadius: 6,
                        padding: "3px 5px",
                        background: "#fafaf8",
                        cursor: "pointer",
                        outline: "none",
                        flexShrink: 0,
                      }}
                    >
                      {TIPO_MESA.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <CapacidadBar ocupados={personas.length} />

                  {blocked && (
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#e53e3e", textAlign: "center", margin: "0 0 6px", fontWeight: 500 }}>
                      Mesa llena — no se puede agregar
                    </p>
                  )}

                  {personas.length > 0 ? (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                      {personas.map((p) => (
                        <li
                          key={p.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, p.id)}
                          onDragEnd={handleDragEnd}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#f9f5ef"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            cursor: "grab",
                            borderRadius: 6,
                            padding: "3px 4px",
                            userSelect: "none",
                            transition: "background 0.1s",
                          }}
                        >
                          <span style={{ fontSize: 10, color: "#ccc", flexShrink: 0, lineHeight: 1 }}>⠿</span>
                          <span style={{ fontSize: 12, flexShrink: 0 }}>{TIPO_EMOJI[p.tipo]}</span>
                          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#555", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {p.nombre}
                          </span>
                          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 10, color: "#bbb", flexShrink: 0 }}>
                            {invMap[p.invitado_id]?.nombre?.split(" ")[0] ?? ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{
                      padding: "12px 0",
                      textAlign: "center",
                      border: `2px dashed ${isOver ? "#b49b6b" : "#e8dcc8"}`,
                      borderRadius: 8,
                      transition: "border-color 0.15s",
                    }}>
                      <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 11, color: isOver ? "#b49b6b" : "#ccc" }}>
                        {isOver ? "Soltar aquí" : "Vacía"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sin asignar — zona de drop para desasignar */}
          <div
            onDragOver={(e) => handleDragOver(e, "sin-asignar")}
            onDrop={(e) => handleDrop(e, "sin-asignar")}
            onDragLeave={() => setDragOver(null)}
            style={{
              marginTop: 16,
              background: dragOver === "sin-asignar" ? "#fff3e0" : "#fff8f0",
              border: dragOver === "sin-asignar"
                ? "2px dashed #b49b6b"
                : "1px solid #f2e8d5",
              borderRadius: 10,
              padding: "14px 16px",
              transition: "border 0.15s, background 0.15s",
              minHeight: 60,
            }}
          >
            <p style={{ margin: "0 0 8px", fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#b49b6b", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              Sin asignar — {sinAsignar.length} persona{sinAsignar.length !== 1 ? "s" : ""}
              {dragOver === "sin-asignar" && (
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, fontWeight: 400 }}>
                  Soltar para quitar de mesa
                </span>
              )}
            </p>
            {sinAsignar.length === 0 && dragOver !== "sin-asignar" ? (
              <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#ccc" }}>
                Todos asignados ✓
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {sinAsignar.map((p) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, p.id)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f2e8d5"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "grab",
                      borderRadius: 6,
                      padding: "3px 6px",
                      userSelect: "none",
                      transition: "background 0.1s",
                    }}
                  >
                    <span style={{ fontSize: 10, color: "#ccc", flexShrink: 0 }}>⠿</span>
                    <span style={{ fontSize: 13, flexShrink: 0 }}>{TIPO_EMOJI[p.tipo]}</span>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#555", flex: 1 }}>{p.nombre}</span>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#bbb" }}>
                      {invMap[p.invitado_id]?.nombre ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
