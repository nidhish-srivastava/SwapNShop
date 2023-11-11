import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const dropdown = [
  {
    label: "Bike",
    options : [
      "Harley",
      "Yezdi",
      "BMW",
      "Kawasaki",
      "Revolt",
      "Ducati",
      "Bajaj",
      "Hero",
      "Hero Honda",
      "Honda",
      "KTM",
      "Royal Enfield",
      "Suzuki",
      "TVS",
      "Yamaha",
      "Other Brands"
    ]
  },
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
      "Other Brand"
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

type props = {
  label: string;
};

function DropDowns({ label }: props) {
  return (
    <>
      <Label>{label}*</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose Brand" />
        </SelectTrigger>
        <SelectContent>
          {dropdown.find((e) => e.label == label)
            ?.options.map((e) => (
              <SelectItem className="cursor-pointer" value={e}>
                {e}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  )
}
  
export default DropDowns
