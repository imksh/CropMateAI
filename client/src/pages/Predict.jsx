import { useState, useEffect } from "react";
import { useCallback } from "react";
import { TbLoader2 } from "react-icons/tb";
import { recordPrediction } from "../utils/predictionHistory";
import { HarvestTimeSlider } from "../components/ui/HarvestTimeSlider";

export const Predict = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ?? "http://10.250.167.71:8001";

  const [result, setResult] = useState({});

  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [input, setInput] = useState({
    Crop_Type: "Rice",
    Soil_Type: "",
    Soil_pH: 0,
    Temperature: 0,
    Humidity: 0,
    Wind_Speed: 0,
    N: 0,
    P: 0,
    K: 0,
    Crop_Yield: 0,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const getWeather = useCallback(
    async (lat, lon) => {
      if (!apiKey) {
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data?.main || !data?.wind) {
          return;
        }

        setInput((prev) => ({
          ...prev,
          Temperature: data.main.temp,
          Humidity: data.main.humidity,
          Wind_Speed: data.wind.speed,
        }));
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    },
    [apiKey],
  );

  useEffect(() => {
    if (location) {
      getWeather(location.latitude, location.longitude);
    }
  }, [location, getWeather]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Unable to fetch prediction right now.");
      }

      const data = await response.json();
      setResult(data);
      recordPrediction({ input, result: data });
      setShow(true);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Prediction service is currently unavailable. Please try again.",
      );
    } finally {
      setLoader(false);
    }
  };

  const commonInputClass =
    "w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25";

  return (
    <section className="section-shell py-8 sm:py-12">
      <div className="grid gap-8 xl:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white shadow-xl shadow-emerald-900/10">
          <figure className="h-full min-h-64">
            <img
              src="/images/img2.jpg"
              alt="Farm landscape"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>

        <div className="glass-card p-5 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Prediction
              </p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950 sm:text-3xl">
                Harvest Time Predictor
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill your crop and soil details to get an estimated harvest
                timeline.
              </p>
            </div>
            {loader && (
              <TbLoader2 className="animate-spin text-2xl text-emerald-700" />
            )}
          </div>

          {show ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">
                Predicted harvest time
              </p>
              <p className="mt-3 text-5xl font-black text-emerald-900">
                {result.harvest_days}
              </p>
              <p className="mt-1 text-sm text-emerald-700">days</p>
              <div className="mt-5 text-left">
                <HarvestTimeSlider days={result.harvest_days} />
              </div>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="mt-6 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Back to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="Crop_Type"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Crop Type
                  </label>
                  <select
                    id="Crop_Type"
                    name="Crop_Type"
                    value={input.Crop_Type}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  >
                    <option value="">--Select--</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Corn">Corn</option>
                    <option value="Rice">Rice</option>
                    <option value="Barley">Barley</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Sunflower">Sunflower</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Soil_Type"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Soil Type
                  </label>
                  <select
                    id="Soil_Type"
                    name="Soil_Type"
                    value={input.Soil_Type}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  >
                    <option value="">--Select--</option>
                    <option value="Peaty">Peaty</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Saline">Saline</option>
                    <option value="Clay">Clay</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="Soil_pH"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Soil pH
                  </label>
                  <input
                    id="Soil_pH"
                    type="number"
                    step="any"
                    name="Soil_pH"
                    value={input.Soil_pH}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Crop_Yield"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Crop Yield
                  </label>
                  <input
                    id="Crop_Yield"
                    type="number"
                    step="any"
                    name="Crop_Yield"
                    value={input.Crop_Yield}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Temperature"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Temperature (deg C)
                  </label>
                  <input
                    id="Temperature"
                    type="number"
                    step="any"
                    name="Temperature"
                    value={input.Temperature}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Humidity"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Humidity (%)
                  </label>
                  <input
                    id="Humidity"
                    type="number"
                    step="any"
                    name="Humidity"
                    value={input.Humidity}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Wind_Speed"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Wind Speed
                  </label>
                  <input
                    id="Wind_Speed"
                    type="number"
                    step="any"
                    name="Wind_Speed"
                    value={input.Wind_Speed}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="N"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Nitrogen (N)
                  </label>
                  <input
                    id="N"
                    type="number"
                    step="any"
                    name="N"
                    value={input.N}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="P"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Phosphorous (P)
                  </label>
                  <input
                    id="P"
                    type="number"
                    step="any"
                    name="P"
                    value={input.P}
                    onChange={handleInputChange}
                    required
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="K"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Potassium (K)
                  </label>
                  <input
                    id="K"
                    type="number"
                    step="any"
                    name="K"
                    value={input.K}
                    required
                    onChange={handleInputChange}
                    className={commonInputClass}
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {error}
                </p>
              )}

              <button
                className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loader}
              >
                {loader ? (
                  <TbLoader2 className="animate-spin text-lg" />
                ) : (
                  "Predict Harvest"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
