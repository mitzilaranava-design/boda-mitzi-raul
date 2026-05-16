/**
 * API de galería — Supabase
 * Sin credenciales: usa mock (galería vacía). Con .env configurado: usa Supabase real.
 *
 * SUPABASE — Ejecutar en SQL Editor antes de usar:
 * ─────────────────────────────────────────────────
 * Ver supabase-schema.sql → sección "Galería de Fotos"
 *
 * SUPABASE STORAGE — Crear desde el Dashboard:
 *   Bucket: "galeria" (público)
 *   Policy INSERT: anónimo
 *   Policy SELECT: público
 * ─────────────────────────────────────────────────
 */

import { supabase }       from "../lib/supabase";
import { supabaseBackup } from "../lib/supabaseBackup";

// ─── Mock ────────────────────────────────────────────────────────────────────

const MOCK_CONFIG = { activa: false, itinerario_activo: false };
const MOCK_FOTOS = [];

// ─── Config (on/off) ─────────────────────────────────────────────────────────

export async function getGalleryConfig() {
  if (supabase) {
    const { data, error } = await supabase
      .from("galeria_config")
      .select("activa")
      .eq("id", 1)
      .single();
    if (error) return { activa: false };
    return data;
  }
  await new Promise((r) => setTimeout(r, 200));
  return { ...MOCK_CONFIG };
}

export async function toggleGallery(activa) {
  if (supabase) {
    const { error } = await supabase
      .from("galeria_config")
      .update({ activa })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  await new Promise((r) => setTimeout(r, 300));
  MOCK_CONFIG.activa = activa;
  return { ok: true };
}

// ─── Config itinerario ───────────────────────────────────────────────────────

export async function getItinerarioConfig() {
  if (supabase) {
    const { data, error } = await supabase
      .from("galeria_config")
      .select("itinerario_activo")
      .eq("id", 1)
      .single();
    if (error) return { itinerario_activo: false };
    return data;
  }
  await new Promise((r) => setTimeout(r, 200));
  return { itinerario_activo: MOCK_CONFIG.itinerario_activo };
}

export async function toggleItinerario(activo) {
  if (supabase) {
    const { error } = await supabase
      .from("galeria_config")
      .update({ itinerario_activo: activo })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  }
  await new Promise((r) => setTimeout(r, 300));
  MOCK_CONFIG.itinerario_activo = activo;
  return { ok: true };
}

// ─── Fotos ────────────────────────────────────────────────────────────────────

export async function getFotos() {
  if (supabase) {
    const { data, error } = await supabase
      .from("galeria_fotos")
      .select("id, url, nombre, comentario, invitado_id, created_at")
      .order("created_at", { ascending: true });
    if (error) return [];
    return data ?? [];
  }
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_FOTOS];
}

/**
 * Comprime una imagen usando Canvas API.
 * Reduce al lado mayor a maxPx manteniendo proporción. Exporta como JPEG a la calidad indicada.
 * Imágenes pequeñas (ya menores a maxPx) se devuelven sin escalar pero sí se re-encodean a JPEG.
 */
async function comprimirImagen(file, maxPx = 2048, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width >= height) {
          height = Math.round((height * maxPx) / width);
          width = maxPx;
        } else {
          width = Math.round((width * maxPx) / height);
          height = maxPx;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Error al comprimir imagen"));
          resolve(new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo cargar la imagen"));
    };

    img.src = objectUrl;
  });
}

/**
 * Sube una foto al bucket "gallery" y registra metadata en galeria_fotos.
 * Comprime a max 2048px / 88% calidad antes de subir (~600 KB promedio).
 * @param {File} file
 * @param {string|null} invitadoId - ID del invitado si viene de /inv/:id, null si es QR externo.
 * @param {string|null} comentario - Comentario opcional del invitado sobre la foto.
 *
 * NOTA DB: asegúrate de tener la columna `comentario TEXT` en la tabla galeria_fotos.
 * SQL: ALTER TABLE galeria_fotos ADD COLUMN IF NOT EXISTS comentario TEXT;
 */
export async function subirFoto(file, invitadoId = null, comentario = null) {
  if (supabase) {
    // Nombre base compartido → permite correlacionar original con comprimido
    const baseName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const ext      = file.name.match(/\.\w+$/)?.[0]?.toLowerCase() ?? ".jpg";

    // ── 1. Guardar original (paralelo, no bloqueante) ──────────────────────
    // Usa proyecto Supabase separado si VITE_SUPABASE_BACKUP_* están en .env,
    // si no, cae en el mismo proyecto con bucket privado "gallery-originals".
    const clienteOriginal = supabaseBackup ?? supabase;
    clienteOriginal.storage
      .from("gallery-originals")
      .upload(`${baseName}${ext}`, file, { cacheControl: "3600", upsert: false })
      .catch(() => {});

    // ── 2. Comprimir y subir versión pública (flujo principal) ─────────────
    const fileComprimido = await comprimirImagen(file);
    const fileName = `${baseName}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, fileComprimido, { cacheControl: "3600", upsert: false });
    if (uploadError) throw new Error(uploadError.message);

    const { data: { publicUrl } } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase
      .from("galeria_fotos")
      .insert({
        url: publicUrl,
        invitado_id: invitadoId,
        comentario: comentario?.trim() || null,
      });
    if (insertError) throw new Error(insertError.message);

    return { ok: true, url: publicUrl };
  }

  // Mock: simula subida y agrega foto local
  await new Promise((r) => setTimeout(r, 800));
  const mockFoto = {
    id: `mock-${Date.now()}`,
    url: URL.createObjectURL(file),
    comentario: comentario?.trim() || null,
    invitado_id: invitadoId,
    created_at: new Date().toISOString(),
  };
  MOCK_FOTOS.unshift(mockFoto);
  return { ok: true, url: mockFoto.url };
}

// ─── Tiempo real ──────────────────────────────────────────────────────────────

/**
 * Suscribe a nuevas fotos en tiempo real.
 * @param {(foto: object) => void} callback - Se llama con la foto nueva al insertarse.
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribeFotos(callback) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel("galeria_fotos_rt")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "galeria_fotos" },
      (payload) => callback(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}
