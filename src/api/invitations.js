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
 * RECOMENDACIÓN: Migrar IDs de inv-001 a UUIDs con gen_random_uuid()
 * para hacer imposible el brute force de IDs.
 */

import { supabase } from "../lib/supabase";

// Mock cuando Supabase no está configurado
const MOCK_INVITADOS = {
  "inv-001": {
    id: "inv-001",
    nombre: "Juan Pérez",
    celular: "+521234567890",
    num_invitados: 2,
    num_confirmados: 0,
    confirmado: false,
  },
  "inv-002": {
    id: "inv-002",
    nombre: "María García",
    celular: "+529876543210",
    num_invitados: 4,
    num_confirmados: 0,
    confirmado: false,
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
