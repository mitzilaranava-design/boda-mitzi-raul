import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Monogram from "../components/Monogram";

export default function Intro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/inv/${id}`);
  };

  return (
    <section className="intro intro-clean">

      <div className="intro-clean__content">

        {/* Monograma clickeable */}
        <motion.div
          className="intro-clean__mono"
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: [1, 1.06, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Monogram />
        </motion.div>

        {/* Texto indicativo sutil */}
        <motion.p
          className="intro-clean__hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Toca el sello
        </motion.p>

      </div>

    </section>
  );
}
