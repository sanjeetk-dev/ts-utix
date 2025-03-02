export function formatNumber(num: number, unit: "K" | "M" | "B" | "" = ""): string {
  const units: Record<"K" | "M" | "B", number> = {
    K: 1_000,
    M: 1_000_000,
    B: 1_000_000_000,
  };

  if (unit && num < units[unit]) return num.toString();

  const format = (value: number, suffix: keyof typeof units) => {
    const formatted = (value / units[suffix]).toFixed(1);
    return formatted.endsWith(".0") ? `${Math.floor(value / units[suffix])}${suffix}` : `${formatted}${suffix}`;
  };

  if (unit in units) return format(num, unit as keyof typeof units);
  if (num >= units.B) return format(num, "B");
  if (num >= units.M) return format(num, "M");
  if (num >= units.K) return format(num, "K");

  return num.toString();
}
