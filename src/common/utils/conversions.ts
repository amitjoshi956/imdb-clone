export const formatCurrency = (amount: number) =>
  amount > 0 ? `$${amount.toLocaleString("en-US")}` : "—";

export const formatRuntime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
