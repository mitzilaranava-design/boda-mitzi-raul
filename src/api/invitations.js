/**
 * API de invitaciones — Supabase
 * Sin credenciales: usa mock. Con .env configurado: usa Supabase.
 *
 * SUPABASE RLS — Ejecutar en Supabase Dashboard → SQL Editor:
 * ─────────────────────────────────────────────────────────────
 * ALTER TABLE invitados ENABLE ROW LEVEL SECURITY;
 *
 * -- Permitir leer un registro por ID (el front filtra con .eq("id", id))
 * CREATE POLICY "leer por id" ON invitados
 *   FOR SELECT USING (true);
 *
 * -- Permitir actualizar solo el campo de confirmación
 * CREATE POLICY "confirmar propio" ON invitados
 *   FOR UPDATE USING (true) WITH CHECK (true);
 *
 * -- INSERT y DELETE quedan bloqueados (sin política = denegado con RLS activo)
 * ─────────────────────────────────────────────────────────────
 * IDs: la columna id usa DEFAULT gen_random_uuid()::text.
 * Al insertar sin especificar id, Supabase genera un UUID automáticamente.
 */

import { supabase } from "../lib/supabase";

// Mock cuando Supabase no está configurado (IDs tipo UUID, igual que en producción)
const MOCK_INVITADOS = {
  "35867478-4c13-4760-a8e4-2cc8f467e07c": {
    id: "35867478-4c13-4760-a8e4-2cc8f467e07c",
    nombre: "Juan Pérez",
    celular: "+521234567890",
    num_invitados: 2,
    num_confirmados: 0,
    confirmado: false,
    recordatorios_enviados: 0,
    ultimo_recordatorio: null,
    auto_confirmado: false,
    save_the_date_enviado: false,
    save_the_date_leido: false,
  },
  "1211463d-e6a6-41c7-bf40-3e50853eea30": {
    id: "1211463d-e6a6-41c7-bf40-3e50853eea30",
    nombre: "María García",
    celular: "+529876543210",
    num_invitados: 4,
    num_confirmados: 0,
    confirmado: false,
    recordatorios_enviados: 0,
    ultimo_recordatorio: null,
    auto_confirmado: false,
    save_the_date_enviado: false,
    save_the_date_leido: false,
  },
};

export async function getInvitado(id) {
  if (supabase) {
    const { data, error } = await supabase
      .from("invitados")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  }
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_INVITADOS[id] || null;
}

export async function getAllInvitados() {
  if (supabase) {
    const { data, error } = await supabase
      .from("invitados")
      .select("*")
      .order("nombre");
    if (error) throw new Error(error.message);
    return data;
  }
  await new Promise((r) => setTimeout(r, 300));
  return Object.values(MOCK_INVITADOS);
}

export async function confirmarAsistencia(id, numConfirmados) {
  if (supabase) {
    const { error } = await supabase
      .from("invitados")
      .update({
        confirmado: true,
        num_confirmados: numConfirmados,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  await new Promise((r) => setTimeout(r, 500));
  if (MOCK_INVITADOS[id]) {
    MOCK_INVITADOS[id].confirmado = true;
    MOCK_INVITADOS[id].num_confirmados = numConfirmados;
  }
  return { ok: true };
}

export async function marcarRecordatorio(id) {
  if (supabase) {
    const { data: current, error: fetchError } = await supabase
      .from("invitados")
      .select("recordatorios_enviados")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);
    const { error } = await supabase
      .from("invitados")
      .update({
        recordatorios_enviados: (current.recordatorios_enviados ?? 0) + 1,
        ultimo_recordatorio: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  if (MOCK_INVITADOS[id]) {
    MOCK_INVITADOS[id].recordatorios_enviados += 1;
    MOCK_INVITADOS[id].ultimo_recordatorio = new Date().toISOString();
  }
  return { ok: true };
}

export async function marcarSaveTheDate(id) {
  if (supabase) {
    const { error } = await supabase
      .from("invitados")
      .update({ save_the_date_enviado: true })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  if (MOCK_INVITADOS[id]) {
    MOCK_INVITADOS[id].save_the_date_enviado = true;
  }
  return { ok: true };
}

export async function marcarSaveTheDateLeido(id) {
  if (supabase) {
    const { error } = await supabase
      .from("invitados")
      .update({ save_the_date_leido: true })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  if (MOCK_INVITADOS[id]) {
    MOCK_INVITADOS[id].save_the_date_leido = true;
  }
  return { ok: true };
}

export async function autoConfirmar(id) {
  if (supabase) {
    const { data: current, error: fetchError } = await supabase
      .from("invitados")
      .select("num_invitados")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);
    const { error } = await supabase
      .from("invitados")
      .update({
        confirmado: true,
        auto_confirmado: true,
        num_confirmados: current.num_invitados,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  if (MOCK_INVITADOS[id]) {
    MOCK_INVITADOS[id].confirmado = true;
    MOCK_INVITADOS[id].auto_confirmado = true;
    MOCK_INVITADOS[id].num_confirmados = MOCK_INVITADOS[id].num_invitados;
  }
  return { ok: true };
}