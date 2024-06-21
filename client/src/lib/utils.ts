import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const wordFrequency = (text: string) => {
  const words = text.replace(/\./g, "").split(/\s/);

  const frequencies: Record<string, number> = {};

  for (const word of words) {
    if (!frequencies[word]) {
      frequencies[word] = 0;
    }

    frequencies[word] += 1;
  }

  return Object.keys(frequencies).map((word) => ({
    text: word,
    value: frequencies[word],
  }));
};
