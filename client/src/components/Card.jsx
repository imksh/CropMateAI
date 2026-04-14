import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react";

export const Card = (props) => {
  const { name, desc, role, img, li, insta } = props;

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-white/40 bg-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-1 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <figure className="aspect-4/3 overflow-hidden">
        <motion.img
          src={img}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </figure>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">{name}</h3>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            {role}
          </h4>
        </div>

        <p className="text-sm text-slate-600">{desc}</p>

        <div className="flex items-center gap-4 pt-2 text-xl">
          <motion.a
            href={li}
            target="_blank"
            rel="noreferrer"
            className="text-[#0A66C2] transition hover:scale-110"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.92 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href={insta}
            target="_blank"
            rel="noreferrer"
            className="text-rose-500 transition hover:scale-110"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.92 }}
          >
            <FaInstagramSquare />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};
