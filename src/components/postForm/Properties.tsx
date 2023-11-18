import React from "react";
import FieldButtonGroup from "./FieldButtonGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DropDown from "./DropDown";
import { propertySchema } from "@/lib/actions/post.actions";

type propertyProps = {
  propertiesFormData : propertySchema 
  setPropertiesFormData: React.Dispatch<React.SetStateAction<propertySchema>>;
}

function Properties({propertiesFormData,setPropertiesFormData}:propertyProps) {
  return (
    <>
      <FieldButtonGroup label="Type" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      <FieldButtonGroup label="Bedrooms" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      <FieldButtonGroup label="Bathrooms" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      <FieldButtonGroup label="Furnishing" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      <FieldButtonGroup label="Construction Status" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>
      <FieldButtonGroup label="Listed By" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData}/>

      <Label htmlFor="superBuiltUpArea">Super Builtup area (ft<sup>2</sup>)*</Label>
      <Input type="number" id="superBuiltUpArea"/>
      <Label htmlFor="carpetArea">Carpet Area (ft<sup>2</sup>)*</Label>
      <Input type="number" min={0} id="carpetArea" />
      <Label htmlFor="maintenance">Maintenance(Monthly)</Label>
      <Input type="number" min={0} id="maintenance"/>
      <Label htmlFor="totalFloors">Total Floors</Label>
      <Input type="number" id="totalFloors" min={0}/>
      <Label htmlFor="floorNo">Floor No</Label>
      <Input type="number" id="floorNo" min={0}/>

      <FieldButtonGroup label="Car Parking" propertiesFormData={propertiesFormData} setPropertiesFormData={setPropertiesFormData} />
      <DropDown label="Facing"/>

      <Label htmlFor="projectName">Project Name</Label>
      <Input type="text" id="projectName"/>
    </>
  );
}

export default Properties;
