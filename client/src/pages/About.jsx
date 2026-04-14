import data from "../data/about.json";
import { Card } from "../components/Card";
export const About = () => {
  return (
    <div className="section-shell space-y-10 py-8 sm:py-12">
      <section className="glass-card p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          About Platform
        </p>
        <h2 className="mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl">
          About CropMateAI
        </h2>
        <p className="mt-5 text-slate-700">
          CropMateAI is an intelligent prediction system designed to help
          farmers, agronomists, and researchers estimate crop harvest readiness.
          It analyzes soil conditions, climatic data, and nutrient levels to
          forecast how many days a crop may need before harvest.
        </p>

        <h3 className="mt-8 text-xl font-bold text-emerald-900">Purpose</h3>
        <p className="mt-2 text-slate-700">
          Improve farming efficiency with data-driven maturity insights that
          support better planning, reduced waste, and improved productivity.
        </p>

        <h3 className="mt-8 text-xl font-bold text-emerald-900">
          How It Works
        </h3>
        <p className="mt-2 text-slate-700">
          CropMateAI uses a Random Forest Regressor trained with realistic
          agricultural patterns. It evaluates:
        </p>
        <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2">
          <li className="rounded-xl bg-emerald-50 px-4 py-2">
            Crop type and soil type
          </li>
          <li className="rounded-xl bg-emerald-50 px-4 py-2">Soil pH</li>
          <li className="rounded-xl bg-emerald-50 px-4 py-2">
            Temperature, humidity, wind speed
          </li>
          <li className="rounded-xl bg-emerald-50 px-4 py-2">
            Nutrient levels (N, P, K)
          </li>
          <li className="rounded-xl bg-emerald-50 px-4 py-2 sm:col-span-2">
            Crop yield
          </li>
        </ul>

        <h3 className="mt-8 text-xl font-bold text-emerald-900">Accuracy</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              R2 Score
            </p>
            <p className="text-2xl font-bold text-emerald-800">0.96</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Mean Error
            </p>
            <p className="text-2xl font-bold text-emerald-800">+/- 3 days</p>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-bold text-emerald-900">Powered By</h3>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          <li className="rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white">
            Python + Scikit-learn
          </li>
          <li className="rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white">
            Flask API
          </li>
          <li className="rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white">
            React
          </li>
          <li className="rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white">
            Render + Netlify
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-emerald-950 sm:text-4xl">
          Team
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.map((curr, indx) => (
            <Card
              key={indx}
              name={curr.name}
              role={curr.role}
              img={curr.image}
              desc={curr.bio}
              li={curr.linkedin}
              insta={curr.insta}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
