import React from "react";
import FieldButtonGroup from "./FieldButtonGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DropDown from "./DropDown";

function Properties() {
  return (
    <>
      <FieldButtonGroup label="Type"/>
      <FieldButtonGroup label="Bedrooms"/>
      <FieldButtonGroup label="Bathrooms"/>
      <FieldButtonGroup label="Furnishing"/>
      <FieldButtonGroup label="Construction Status"/>
      <FieldButtonGroup label="Listed By"/>
      <Label>Super Builtup area (ft<sup>2</sup>)*</Label>
      <Input type="number"/>
      <Label>Carpet Area (ft<sup>2</sup>)*</Label>
      <Input type="number" min={0}/>
      <Label>Maintenance(Monthly)</Label>
      <Input type="number" min={0}/>
      <Label>Total Floors</Label>
      <Input type="number" min={0}/>
      <Label>Floor No</Label>
      <Input type="number" min={0}/>
      <FieldButtonGroup label="Car Parking"/>
      <DropDown label="Facing"/>
      <Label>Project Name</Label>
      <Input type="text"/>
    </>
  );
}

export default Properties;
