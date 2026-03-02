import { motion } from "framer-motion";
import { WEDDING, fadeUp } from "../../data/wedding";

export default function InvSchedule() {
  return (
    <motion.section className="inv-section inv-schedule" {...fadeUp}>
      <div className="inv-section__inner inv-section__inner--center">
        <p className="inv-section__label">Plan Your Day</p>
        <h2>Wedding Day Schedule</h2>
        <ol className="inv-timeline">
          {WEDDING.schedule.map((item) => (
            <li key={item.time} className="inv-timeline__item">
              <span className="inv-timeline__time">{item.time}</span>
              <span className="inv-timeline__dot" />
              <span className="inv-timeline__event">{item.event}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
