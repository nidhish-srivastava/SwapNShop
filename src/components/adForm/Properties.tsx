import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DropDown from "./DropDown";
import { propertySchema } from "@/lib/actions/post.actions";
import { fieldButtons } from "@/lib/utils";
import PropertyFieldButtons from "./PropertyFieldButtons";

type propertyProps = {
  propertiesFormData : propertySchema 
  setPropertiesFormData: React.Dispatch<React.SetStateAction<propertySchema>>;
}

function Properties({propertiesFormData,setPropertiesFormData}:propertyProps) {

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPropertiesFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
    {
      fieldButtons.map(e=>(
      <PropertyFieldButtons label={e.label} propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      ))
    }
   
      <Label htmlFor="superBuiltUpArea">Super Builtup area (ft<sup>2</sup>)*</Label>
      <Input value={propertiesFormData.superBuiltUpArea} onChange={changeHandler} name="superBuiltUpArea" type="number" min={0} id="superBuiltUpArea"/>
      <Label htmlFor="carpetArea">Carpet Area (ft<sup>2</sup>)*</Label>
      <Input value={propertiesFormData.carpetArea} type="number" min={0} onChange={changeHandler} id="carpetArea" name="carpetArea" />
      <Label htmlFor="maintenance">Maintenance(Monthly)*</Label>
      <Input value={propertiesFormData.maintenance} type="number" min={0} id="maintenance" onChange={changeHandler} name="maintenance" />
      <Label htmlFor="totalFloors">Total Floors*</Label>
      <Input value={propertiesFormData.totalFloors} type="number" id="totalFloors" min={0} onChange={changeHandler} name="totalFloors" />
      <Label htmlFor="floorNo">Floor No*</Label>
      <Input value={propertiesFormData.floorNo} type="number" id="floorNo" min={0} onChange={changeHandler} name="floorNo"/>

      <DropDown label="Facing" setPropertiesFormData={setPropertiesFormData}/>

      <Label htmlFor="projectName">Project Name*</Label>
      <Input type="text" id="projectName" onChange={changeHandler} value={propertiesFormData.projectName} name="projectName" />
    </>
  );
}

export default Properties;
