import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dropdownArray = [
  {
    label: "Mobile",
    options: [
      "IPhone",
      "Samsung",
      "Redmi",
      "Realme",
      "One Plus",
      "Oppo",
      "Google Pixel",
      "Asus",
      "Sony",
    ],
  },
  {
    label: "Facing",
    options: [
      "East",
      "West",
      "North",
      "South",
      "North-East",
      "North-West",
      "South-East",
      "South-West",
    ],
  },
];