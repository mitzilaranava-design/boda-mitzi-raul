import { useState, useCallback } from "react";
import { asignarMesaPase } from "../../api/pases";

const TOTAL_MESAS = 20;
const ASIENTOS = 12;

const TIPO_EMOJI = {
  adulto_hombre: "👨",
  adulto_mujer: "👩",
  nino: "👦",
  nina: "👧",
};

function CapacidadBar({ ocupados }) {
  const pct = Math.min(100, Math.round((ocupados / ASIENTOS) * 100));
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

function abrirReporte(invitados, pases) {
  const invMap = Object.fromEntries(invitados.map((i) => [i.id, i.nombre]));

  const mesasData = Array.from({ length: TOTAL_MESAS }, (_, i) => {
    const num = i + 1;
    const personas = pases.filter((p) => p.mesa === num);
    return { num, personas };
  });
  const sinAsignar = pases.filter((p) => !p.mesa);

  const filas = mesasData.map(({ num, personas }) => {
    if (personas.length === 0)
      return `<tr><td style="font-weight:600;padding:8px 12px;border-bottom:1px solid #f0e8d5">Mesa ${num}</td><td style="padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">—</td><td style="padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">—</td><td style="text-align:center;padding:8px 12px;border-bottom:1px solid #f0e8d5;color:#ccc">0</td></tr>`;
    const libres = ASIENTOS - personas.length;
    return personas.map((p, idx) =>
      `<tr>
        ${idx === 0 ? `<td rowspan="${personas.length}" style="font-weight:600;padding:8px 12px;border-bottom:2px solid #e8dcc8;vertical-align:top">Mesa ${num}</td>` : ""}
        <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5">${p.nombre}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888">${TIPO_EMOJI[p.tipo] ?? ""} ${p.tipo.replace("_", " ")}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888;font-size:11px">${invMap[p.invitado_id] ?? ""}</td>
        ${idx === 0 ? `<td rowspan="${personas.length}" style="text-align:center;padding:8px 12px;border-bottom:2px solid #e8dcc8;vertical-align:middle;color:${libres < 0 ? "#e53e3e" : "#16a34a"};font-weight:600">${personas.length}/${ASIENTOS}</td>` : ""}
      </tr>`
    ).join("");
  }).join("");

  const filasSin = sinAsignar.map((p) =>
    `<tr style="background:#fff8f0">
      <td style="color:#b49b6b;padding:6px 12px;border-bottom:1px solid #f5f5f5">Sin asignar</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5">${p.nombre}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888">${TIPO_EMOJI[p.tipo] ?? ""} ${p.tipo.replace("_", " ")}</td>
      <td style="padding:6px 12px;border-bottom:1px solid #f5f5f5;color:#888;font-size:11px">${invMap[p.invitado_id] ?? ""}</td>
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
    <th>Mesa</th><th>Persona</th><th>Tipo</th><th>Invitación</th><th style="text-align:center">Ocupación</th>
  </tr></thead>
  <tbody>${filas}${filasSin}</tbody>
</table>
<p class="footer">${pases.filter((p) => p.mesa).length} personas asignadas · ${sinAsignar.length} sin asignar</p>
</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

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

export default function TabMesas({ invitados, pases, onMesaChange }) {
  const [vista, setVista] = useState("asignacion");
  const [guardando, setGuardando] = useState({});

  const invMap = Object.fromEntries(invitados.map((i) => [i.id, i]));

  // Solo pases de invitados activos que asisten
  const pasesActivos = pases.filter((p) => {
    const inv = invMap[p.invitado_id];
    return inv?.enviar_save_the_date && !inv?.no_asiste;
  });

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

  // Ordenar: primero con mesa (asc), luego sin
  const pasesOrdenados = [...pasesActivos].sort((a, b) => {
    if (a.mesa && b.mesa) return a.mesa - b.mesa;
    if (a.mesa) return -1;
    if (b.mesa) return 1;
    return (a.nombre ?? "").localeCompare(b.nombre ?? "");
  });

  // Agrupar por invitado para vista asignación (solo activos que asisten)
  const grupos = invitados
    .filter((inv) => inv.enviar_save_the_date && !inv.no_asiste)
    .map((inv) => ({
      inv,
      personas: pasesOrdenados.filter((p) => p.invitado_id === inv.id),
    }))
    .filter((g) => g.personas.length > 0);

  // Mesa cards
  const mesasData = Array.from({ length: TOTAL_MESAS }, (_, i) => {
    const num = i + 1;
    const personas = pasesActivos.filter((p) => p.mesa === num);
    return { num, personas };
  });

  const sinAsignar = pasesActivos.filter((p) => !p.mesa);
  const asignados = pasesActivos.filter((p) => p.mesa).length;

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
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button style={tabBtn(vista === "asignacion")} onClick={() => setVista("asignacion")}>
          Asignación
        </button>
        <button style={tabBtn(vista === "reporte")} onClick={() => setVista("reporte")}>
          Vista por mesa
        </button>
        <button
          onClick={() => abrirReporte(invitados, pasesActivos)}
          style={{ marginLeft: "auto", background: "#f9f5ef", color: "#b49b6b", border: "1px solid #e8dcc8", borderRadius: 99, padding: "8px 16px", fontFamily: "Poppins, sans-serif", fontSize: 13, cursor: "pointer", minHeight: 40 }}
        >
          Imprimir / Exportar
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total personas", value: pasesActivos.length, color: "#222" },
          { label: "Asignadas", value: asignados, color: "#16a34a" },
          { label: "Sin asignar", value: sinAsignar.length, color: "#b49b6b" },
          { label: "Grupos registrados", value: grupos.length, color: "#9d8558" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 22, color, fontWeight: 700 }}>{value}</p>
            <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 9, color: "#999", marginTop: 2 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Vista: Asignación — agrupada por invitación */}
      {vista === "asignacion" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {grupos.map(({ inv, personas }) => (
            <div key={inv.id} style={{ background: "#fff", border: "1px solid #e8dcc8", borderRadius: 10, padding: "12px 14px" }}>
              {/* Header invitación */}
              <p style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#222", fontWeight: 600 }}>
                {inv.nombre}
              </p>
              {/* Personas */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {personas.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{TIPO_EMOJI[p.tipo]}</span>
                    <span style={{ flex: 1, fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.nombre}
                    </span>
                    {p.mesa && (
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#b49b6b", background: "#f9f5ef", borderRadius: 99, padding: "2px 8px", flexShrink: 0 }}>
                        M{p.mesa}
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
                        <option key={i + 1} value={i + 1}>Mesa {i + 1}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista: Por mesa */}
      {vista === "reporte" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {mesasData.map(({ num, personas }) => (
              <div
                key={num}
                style={{ background: "#fff", border: `1px solid ${personas.length > ASIENTOS ? "#feb2b2" : "#e8dcc8"}`, borderRadius: 10, padding: "12px 14px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#222", fontWeight: 700 }}>
                    Mesa {num}
                  </p>
                </div>
                <CapacidadBar ocupados={personas.length} />
                {personas.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                    {personas.map((p) => (
                      <li key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 12 }}>{TIPO_EMOJI[p.tipo]}</span>
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
                  <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#ccc", textAlign: "center" }}>
                    Vacía
                  </p>
                )}
              </div>
            ))}
          </div>

          {sinAsignar.length > 0 && (
            <div style={{ marginTop: 16, background: "#fff8f0", border: "1px solid #f2e8d5", borderRadius: 10, padding: "14px 16px" }}>
              <p style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#b49b6b", fontWeight: 700 }}>
                Sin asignar — {sinAsignar.length} persona{sinAsignar.length !== 1 ? "s" : ""}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sinAsignar.map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13 }}>{TIPO_EMOJI[p.tipo]}</span>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#555", flex: 1 }}>{p.nombre}</span>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "#bbb" }}>
                      {invMap[p.invitado_id]?.nombre ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
