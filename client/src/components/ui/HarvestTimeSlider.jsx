const DEFAULT_MAX_DAYS = 365;

const clampDays = (value, maxDays) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(numericValue), 0), maxDays);
};

export const HarvestTimeSlider = ({ days, label = "Time left to harvest" }) => {
  const maxDays = DEFAULT_MAX_DAYS;
  const safeDays = clampDays(days, maxDays);

  return (
    <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          {label}
        </p>
        <span className="text-sm font-bold text-emerald-950">
          {safeDays} days
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={maxDays}
        value={safeDays}
        disabled
        aria-label={label}
        aria-valuetext={`${safeDays} days`}
        className="h-2 w-full cursor-default appearance-none rounded-full bg-emerald-200 accent-emerald-700 disabled:opacity-100"
      />
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500">
        <span>Now</span>
        <span>{maxDays} days</span>
      </div>
    </div>
  );
};
