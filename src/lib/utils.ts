import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(
  input1: ClassValue,
  input2: ClassValue,
  ...inputs: ClassValue[]
) {
  return twMerge(clsx(input1, input2, ...inputs));
}
