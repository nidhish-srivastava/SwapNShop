import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fieldButtons = [
  {
    label : "Fuel",
    buttons : ["CNG and Hybrids","Diesel","Electric","LPG","Petrol"]
  },
  {
    label : "Transmission",
    buttons : ["Automatic","Manual"]
  },
  {
    label: "Type",
    buttons: ["Apartments", "Build Floors", "Farm Houses", "Houses and Villas"],
  },
  {
    label:"Bedrooms",
    buttons : [1,2,3,4,"4+"]
  },
  {
    label : "Bathrooms",
    buttons : [1,2,3,4,"4+"]
  },
  {
    label : "Furnishing",
    buttons : ["Furnished","Semi Furnished","Unfurnished"]
  },
  {
    label : "Construction Status",
    buttons : ["New Launch","Ready to move","Under Construction"]
  },
  {
    label : "Listed By",
    buttons : ["Builder","Dealer","Owner"]
  },
  {
    label:  "Car Parking",
    buttons : [0,1,2,3,"3+"]
  },
];



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