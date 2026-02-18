/**
 * API de invitaciones — Supabase
 * Sin credenciales: usa mock. Con .env configurado: usa Supabase.
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
