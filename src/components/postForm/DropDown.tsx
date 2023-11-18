import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bikeSchema } from "@/lib/actions/post.actions";

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
  value  ?: string 
  setValue?: React.Dispatch<React.SetStateAction<bikeSchema>>
  setMobileBrandValue ?: React.Dispatch<React.SetStateAction<{brand:string}>>
};


function DropDowns({ label,value,setValue,setMobileBrandValue }: props) {
  const changeHandler = (e:React.ChangeEvent<HTMLSelectElement | undefined>) =>{
    if(label=="Bike"){
      setValue?.((prev) => ({ ...prev, "brand": e.target.value }));
    }
    if(label=="Mobile"){
      setMobileBrandValue?.((prev) => ({ ...prev, "brand": e.target.value }));
    }

  }
  return (
    <>
      <Label htmlFor="dropdown">{label}*</Label>
      <select id="dropdown" className="select" value={value} onChange={changeHandler}>
          {dropdown.find((e) => e.label == label)
            ?.options.map((e) => (
              <option className="cursor-pointer" value={e}>
                {e}
              </option>
            ))}
            </select>
    </>
  )
}
  
export default DropDowns
