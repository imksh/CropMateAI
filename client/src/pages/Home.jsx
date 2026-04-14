import { NavLink } from "react-router-dom";
import { motion as Motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export const Home = () => {
  return (
    <Motion.div
      className="space-y-12 pb-14 pt-8 sm:space-y-20 sm:pt-12"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.12 },
        },
      }}
    >
      <Motion.section className="section-shell" variants={fadeUp}>
        <Motion.div
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-lime-700 px-6 py-12 text-white shadow-2xl shadow-emerald-900/20 sm:px-10 lg:px-14 lg:py-16"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-300/30 blur-3xl" />
          <div className="absolute -bottom-16 left-6 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Motion.div
              className="space-y-6"
              variants={{
                hidden: { opacity: 0, x: -24 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Motion.p
                className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100"
                variants={fadeUp}
              >
                Precision Agriculture Platform
              </Motion.p>
              <Motion.h1
                className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl"
                variants={fadeUp}
              >
                Farmer&apos;s Ally for data-driven harvest decisions with
                <span className="ml-2 text-lime-200">CropMateAI</span>
              </Motion.h1>
              <Motion.p
                className="max-w-2xl text-sm text-emerald-100 sm:text-base"
                variants={fadeUp}
              >
                Predict harvest timelines with climate and soil intelligence,
                reduce planning uncertainty, and improve yield outcomes season
                after season.
              </Motion.p>
              <Motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
                <NavLink
                  to="/predict"
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-lime-100"
                >
                  Start Prediction
                </NavLink>
                <NavLink
                  to="/about"
                  className="rounded-full border border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  Learn More
                </NavLink>
              </Motion.div>
            </Motion.div>

            <Motion.figure
              className="mx-auto w-full max-w-md max-h-100 overflow-hidden"
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
            >
              <Motion.img
                src="/images/farmer.png"
                alt="Farmer using CropMateAI"
                className="w-full drop-shadow-2xl h-full object-contain transition duration-500 hover:scale-105 max-h-100"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Motion.figure>
          </div>
        </Motion.div>
      </Motion.section>

      <Motion.section className="section-shell" variants={fadeUp}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Motion.article
            className="glass-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-emerald-950 sm:text-3xl">
              Built for grounded, practical farm decisions
            </h2>
            <p className="mt-4 text-slate-600">
              CropMateAI blends weather signals, nutrient context, and crop type
              into a clear harvest-time estimate. It is designed to be usable by
              farmers, agronomists, and teams managing large fields.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>Real-time weather-assisted predictions</li>
              <li>Input model aligned to field-level parameters</li>
              <li>Fast result loop for weekly planning</li>
            </ul>
            <NavLink
              to="/predict"
              className="mt-8 inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Run a Prediction
            </NavLink>
          </Motion.article>

          <Motion.figure
            className="overflow-hidden rounded-3xl border border-white/35 bg-white shadow-xl shadow-emerald-900/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          >
            <Motion.img
              src="/images/img1.jpg"
              alt="Agricultural field"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </Motion.figure>
        </div>
      </Motion.section>
    </Motion.div>
  );
};
