import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  clearPredictionHistory,
  getPredictionHistory,
} from "../utils/predictionHistory";
import { HarvestTimeSlider } from "../components/ui/HarvestTimeSlider";

const fieldLabels = {
  Crop_Type: "Crop",
  Soil_Type: "Soil",
  Soil_pH: "Soil pH",
  Temperature: "Temperature",
  Humidity: "Humidity",
  Wind_Speed: "Wind speed",
  N: "Nitrogen",
  P: "Phosphorus",
  K: "Potassium",
  Crop_Yield: "Crop yield",
};

const formatFieldValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
};

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const RecentPredictions = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getPredictionHistory());
  }, []);

  const handleClearHistory = () => {
    clearPredictionHistory();
    setHistory([]);
  };

  return (
    <section className="section-shell py-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="glass-card p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Prediction History
              </p>
              <h2 className="mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl">
                Recent Predictions
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Every successful harvest estimate is stored locally in your
                browser so you can review recent prediction inputs and results
                without sending the data anywhere else.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/predict"
                className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                New Prediction
              </NavLink>
              <button
                type="button"
                onClick={handleClearHistory}
                disabled={history.length === 0}
                className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-emerald-950">
              No saved predictions yet
            </h3>
            <p className="mt-3 text-slate-600">
              Run a prediction and your result will appear here automatically.
            </p>
            <NavLink
              to="/predict"
              className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Start Predicting
            </NavLink>
          </div>
        ) : (
          <div className="grid gap-5">
            {history.map((entry) => (
              <article key={entry.id} className="glass-card p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                        Saved on {formatDateTime(entry.createdAt)}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-emerald-950">
                        {entry.input?.Crop_Type || "Unknown crop"} ·{" "}
                        {entry.input?.Soil_Type || "unknown soil"}
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {Object.entries(fieldLabels).map(([fieldKey, label]) => (
                        <div
                          key={fieldKey}
                          className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3"
                        >
                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-emerald-900">
                            {formatFieldValue(entry.input?.[fieldKey])}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-44 rounded-3xl bg-linear-to-br from-emerald-900 to-emerald-700 p-5 text-white shadow-lg shadow-emerald-900/20">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
                      Predicted harvest time
                    </p>
                    <p className="mt-3 text-5xl font-black leading-none">
                      {entry.result?.harvest_days ?? "-"}
                    </p>
                    <p className="mt-1 text-sm text-emerald-100">days</p>
                    <div className="mt-5">
                      <HarvestTimeSlider days={entry.result?.harvest_days} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
