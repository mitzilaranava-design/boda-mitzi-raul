import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";

// Pega aquí el enlace de Spotify (canción, playlist o álbum)
// Ejemplo: https://open.spotify.com/track/xxxxx  o  https://open.spotify.com/playlist/xxxxx
const SPOTIFY_LINK = "https://open.spotify.com/intl-es/track/3rUMH7i22tlkymhDPOmXUv?utm_source=chatgpt.com";

function getSpotifyEmbedUrl(link) {
  if (!link || typeof link !== "string") return null;
  const trimmed = link.trim();
  // Acepta: open.spotify.com/track/xxx, open.spotify.com/playlist/xxx, open.spotify.com/album/xxx
  const match = trimmed.match(/spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  const [, type, id] = match;
  return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
}

export default function SaveTheDate() {
  const embedUrl = getSpotifyEmbedUrl(SPOTIFY_LINK);

  return (
    <div className="app">
      {embedUrl && (
        <div className="spotify-widget">
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Reproducir en Spotify"
          />
        </div>
      )}

      <Hero />

      <motion.section
        className="info"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>¡Nos casamos!</h2>
        <p>
          Muy pronto celebraremos juntos el inicio de nuestra nueva historia.
        </p>
        <Countdown />
      </motion.section>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Creado con ❤️ por Mitzi y Raúl
      </motion.footer>
    </div>
  );
}
