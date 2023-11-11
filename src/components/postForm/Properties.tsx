import React from "react";
import FieldButtonGroup from "./FieldButtonGroup";

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
    buttons : [1,2,3,4]
  },
  {
    label : "Bathrooms",
    buttons : [1,2,3,4]
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
  }
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
    </>
  );
}

export default Properties;
