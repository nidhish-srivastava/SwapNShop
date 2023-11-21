import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { carSchema } from "@/lib/actions/post.actions";

type carProps = {
  carsFormData: carSchema;
  setCarsFormData: React.Dispatch<React.SetStateAction<carSchema>>;
};



function Cars({ carsFormData, setCarsFormData }: carProps) {
  const clickHandler = (e:any)=>{
    
  }
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCarsFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Label htmlFor="year">Year*</Label>
      <Input
        type="number"
        name="year"
        value={carsFormData.year}
        onChange={changeHandler}
      />

      <div>
        <Label htmlFor="kmDriven">KM Driven*</Label>
        <Input
          type="number"
          name="kmDriven"
          min={0}
          value={carsFormData.kmDriven}
          onChange={changeHandler}
        />
      </div>
    </>
  );
}

export default Cars;
