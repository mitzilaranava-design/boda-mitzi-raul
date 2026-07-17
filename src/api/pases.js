/**
 * API de pases_detalle — personas individuales por invitación + asignación de mesa.
 *
 * SUPABASE SQL — ejecutar en Dashboard → SQL Editor:
 * ─────────────────────────────────────────────────────
 * NOTA: se usa tabla "boda_pases" (no "pases_detalle") porque esa tabla
 * ya existe en Supabase con FK a invitados_cumple (proyecto Sara Lucía).
 *
 * CREATE TABLE IF NOT EXISTS boda_pases (
 *   id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   invitado_id TEXT NOT NULL REFERENCES invitados(id) ON DELETE CASCADE,
 *   nombre      TEXT NOT NULL,
 *   tipo        TEXT NOT NULL CHECK (tipo IN ('adulto_hombre','adulto_mujer','nino','nina')),
 *   mesa        INTEGER,
 *   created_at  TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE boda_pases ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "read boda_pases"   ON boda_pases FOR SELECT USING (true);
 * CREATE POLICY "insert boda_pases" ON boda_pases FOR INSERT WITH CHECK (true);
 * CREATE POLICY "update boda_pases" ON boda_pases FOR UPDATE USING (true) WITH CHECK (true);
 * CREATE POLICY "delete boda_pases" ON boda_pases FOR DELETE USING (true);
 * ─────────────────────────────────────────────────────
 */

import { supabase } from "../lib/supabase";

let MOCK_PASES = [];

export async function getAllPases() {
  if (supabase) {
    const { data, error } = await supabase
      .from("boda_pases")
      .select("*")
      .order("invitado_id")
      .order("created_at");
    if (error) throw new Error(error.message);
    return data ?? [];
  }
  return [...MOCK_PASES];
}

/**
 * Guarda el grupo de personas de una invitación.
 * personas: [{ nombre, tipo }]  — sin id (se regeneran al guardar)
 * Las mesas de personas eliminadas se pierden; las nuevas empiezan en null.
 */
export async function guardarGrupo(invitado_id, personas) {
  if (supabase) {
    const { error: delError } = await supabase
      .from("boda_pases")
      .delete()
      .eq("invitado_id", invitado_id);
    if (delError) throw new Error(delError.message);
    if (personas.length === 0) return [];
    const rows = personas.map((p) => ({ invitado_id, nombre: p.nombre, tipo: p.tipo }));
    const { data, error } = await supabase
      .from("boda_pases")
      .insert(rows)
      .select();
    if (error) throw new Error(error.message);
    return data;
  }
  MOCK_PASES = MOCK_PASES.filter((p) => p.invitado_id !== invitado_id);
  const nuevos = personas.map((p) => ({
    id: crypto.randomUUID(),
    invitado_id,
    nombre: p.nombre,
    tipo: p.tipo,
    mesa: null,
    created_at: new Date().toISOString(),
  }));
  MOCK_PASES.push(...nuevos);
  return nuevos;
}

export async function asignarMesaPase(id, mesa) {
  if (supabase) {
    const { error } = await supabase
      .from("boda_pases")
      .update({ mesa })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  const pase = MOCK_PASES.find((p) => p.id === id);
  if (pase) pase.mesa = mesa;
  return { ok: true };
}
