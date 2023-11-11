import React from "react";
import FieldButtonGroup from "./FieldButtonGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DropDown from "./DropDown";

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
      <Input type="number"/>
      <Label>Maintenance(Monthly)</Label>
      <Input type="number"/>
      <Label>Total Floors</Label>
      <Input type="number"/>
      <Label>Floor No</Label>
      <Input type="number"/>
      <FieldButtonGroup label="Car Parking"/>
      <DropDown label="Facing"/>
      <Label>Project Name</Label>
      <Input type="text"/>
    </>
  );
}

export default Properties;
