import { currencies } from "@/lib/data/currencies";

export const formatCurrency = (
  amount: number,
  currencyCode: string
): string => {
  const currency = currencies.find((c) => c.code === currencyCode);
  if (!currency) return `${currencyCode} ${amount.toFixed(2)}`;

  return currency.symbol
    ? `${currency.symbol}${amount.toFixed(2)}`
    : `${currency.code} ${amount.toFixed(2)}`;
};
