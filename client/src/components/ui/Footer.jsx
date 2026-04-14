import {
  FaEnvelope,
  FaArrowRight,
  FaRegCopyright,
  FaHeart,
  FaInfinity,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-emerald-100 bg-white/75 py-10 backdrop-blur-sm sm:mt-16">
      <div className="section-shell space-y-8">
        <section className="rounded-3xl bg-linear-to-r from-emerald-900 to-emerald-700 p-6 text-white shadow-xl shadow-emerald-900/20 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
            Build with us
          </p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            Have a project in mind?
          </h3>
          <p className="mt-2 text-sm text-emerald-100 sm:text-base">
            Let&apos;s shape your next agriculture-tech product together.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=7295038835&text=Hi%20Karan%2C%20I%20visited%20your%20portfolio%20and%20wanted%20to%20connect."
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-900 transition hover:bg-lime-100"
          >
            Book a Call <FaArrowRight />
          </a>
        </section>

        <section className="grid gap-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-950/5 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold text-emerald-950">Contact</h4>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=idioticminds0@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-slate-700 transition hover:text-emerald-700"
            >
              <FaEnvelope className="mt-1" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-slate-500">
                  Email
                </span>
                idioticminds0@gmail.com
              </span>
            </a>
            <a
              href="sms:+919201274547"
              className="flex items-start gap-3 text-slate-700 transition hover:text-emerald-700"
            >
              <FaEnvelope className="mt-1" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-slate-500">
                  Phone
                </span>
                +91 7295038835
              </span>
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-bold text-emerald-950">Quick Links</h4>
            <ul className="space-y-2 text-sm font-medium text-slate-700">
              <li>
                <NavLink className="transition hover:text-emerald-700" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="transition hover:text-emerald-700"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="transition hover:text-emerald-700"
                  to="/predict"
                >
                  Predict
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="transition hover:text-emerald-700"
                  to="/recent-predictions"
                >
                  Recent Predictions
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-emerald-800">CropMateAI</p>
            <p className="mt-2">
              AI-powered crop maturity insights built for practical farm
              operations.
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-emerald-100 pt-5 text-xs text-slate-500 sm:flex-row">
          <p className="flex items-center gap-2">
            <FaRegCopyright /> 2026 | Website made with{" "}
            <FaHeart className="text-rose-500" />
          </p>
          <p className="flex items-center gap-2">
            <FaInfinity /> IdioticMinds
          </p>
        </div>
      </div>
    </footer>
  );
};
