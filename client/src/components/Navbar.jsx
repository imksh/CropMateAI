import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { AnimatePresence, motion } from "motion/react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition",
      isActive
        ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700",
    ].join(" ");

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-[#f4f8f3]/90 backdrop-blur-md">
      <nav className="section-shell flex items-center justify-between py-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <NavLink
            to="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <figure className="h-11 w-11 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
              <img
                src="/logo.png"
                alt="CropMateAI logo"
                className="h-full w-full object-cover"
              />
            </figure>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Smart Farming
              </p>
              <h1 className="text-lg font-bold leading-none text-emerald-950">
                CropMateAI
              </h1>
            </div>
          </NavLink>
        </motion.div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-emerald-100 bg-white p-2 text-emerald-700 shadow-sm lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt3 className="text-2xl" />
          )}
        </button>

        <ul className="hidden items-center gap-3 lg:flex">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/predict" className={linkClass}>
              Predict
            </NavLink>
          </li>
          <li>
            <NavLink to="/recent-predictions" className={linkClass}>
              Recent Predictions
            </NavLink>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="section-shell pb-4 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ul className="glass-card flex flex-col gap-2 p-3">
              <li>
                <NavLink to="/" className={linkClass} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={linkClass} onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/predict"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Predict
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recent-predictions"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Recent Predictions
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
