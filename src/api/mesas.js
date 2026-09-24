/**
 * API de boda_mesas — metadatos de cada mesa (nombre personalizado y tipo).
 *
 * SUPABASE SQL — ejecutar en Dashboard → SQL Editor:
 * ─────────────────────────────────────────────────────
 * CREATE TABLE IF NOT EXISTS boda_mesas (
 *   num    INTEGER PRIMARY KEY,
 *   nombre TEXT,
 *   tipo   TEXT NOT NULL DEFAULT 'redonda'
 *     CHECK (tipo IN ('redonda','cuadrada','rectangular'))
 * );
 * ALTER TABLE boda_mesas ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "read boda_mesas"  ON boda_mesas FOR SELECT USING (true);
 * CREATE POLICY "write boda_mesas" ON boda_mesas FOR ALL    USING (true);
 * ─────────────────────────────────────────────────────
 */

import { supabase } from "../lib/supabase";

let MOCK_MESAS = [];

export async function getMesas() {
  if (supabase) {
    const { data, error } = await supabase
      .from("boda_mesas")
      .select("*")
      .order("num");
    if (error) throw new Error(error.message);
    return data ?? [];
  }
  return [...MOCK_MESAS];
}

/** Guarda (upsert) todos los registros de mesas. rows: [{ num, nombre, tipo }] */
export async function saveMesas(rows) {
  if (supabase) {
    const { error } = await supabase
      .from("boda_mesas")
      .upsert(rows, { onConflict: "num" });
    if (error) throw new Error(error.message);
    return;
  }
  rows.forEach((r) => {
    const idx = MOCK_MESAS.findIndex((m) => m.num === r.num);
    if (idx >= 0) MOCK_MESAS[idx] = r;
    else MOCK_MESAS.push(r);
  });
}
