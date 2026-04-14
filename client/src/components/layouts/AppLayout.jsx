import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { Scroll } from "../Scrool";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export const AppLayout = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {show ? (
          <motion.div
            key="splash"
            className="fixed inset-0 z-70 grid place-items-center bg-[#f4f8f3]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-emerald-300/30 blur-2xl" />
              {"CropMateAI".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="relative inline-block text-3xl font-black tracking-tight text-emerald-900 sm:text-5xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Scroll />
            <Header />
            <motion.main
              className="min-h-[70vh]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            >
              <Outlet />
            </motion.main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
