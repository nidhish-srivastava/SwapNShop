import React from "react";
import { Label } from "../ui/label";
import { bikeSchema, propertySchema } from "@/lib/actions/post.actions";

export const dropdown = [
  {
    label: "Bike",
    options: [
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
      "Other Brands",
    ],
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
      "Other Brand",
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
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<bikeSchema>>;
  setMobileBrandValue?: React.Dispatch<React.SetStateAction<{ brand: string }>>;
  setPropertiesFormData?: React.Dispatch<React.SetStateAction<propertySchema>>;
};

function DropDowns({ label, value, setValue, setMobileBrandValue,  setPropertiesFormData }: props) {
  
  const changeHandler = (
    e: React.ChangeEvent<HTMLSelectElement | undefined>
  ) => {
    let final = e.target.value
    if (label == "Bike") {
      setValue?.((prev) => ({ ...prev, brand: final }));
    }
    if (label == "Mobile") {
      setMobileBrandValue?.((prev) => ({ ...prev, brand: final }));
    }
    if (label == "Facing") {
      console.log("asdads");
      setPropertiesFormData?.((prev) => ({...prev,facing : final}))
    }
  };
  return (
    <>
      <Label htmlFor="dropdown">{label}*</Label>
      <select
      required={true}
        id="dropdown"
        className="select"
        value={value}
        onChange={changeHandler}
      >
        {dropdown
          .find((e) => e.label == label)
          ?.options.map((e) => (
            <option className="cursor-pointer" value={e}>
              {e}
            </option>
          ))}
      </select>
    </>
  );
}

export default DropDowns;
