import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { fieldButtons } from "@/lib/utils";
import { carSchema, propertySchema } from "@/lib/actions/post.actions";

type props = {
  label: string;
  setCarsFormData?: React.Dispatch<React.SetStateAction<carSchema>>;
  propertiesFormData?:propertySchema
  setPropertiesFormData?:React.Dispatch<React.SetStateAction<propertySchema>>
};

type fieldButtonsType = {
  label : string
  buttons : {selected:boolean,btn:string | number}[]
}

function PropertyFieldButtons({ label, setCarsFormData, setPropertiesFormData }: props) {
  const [fieldButtonsState,setFieldButtonsState] = useState<fieldButtonsType[]>(fieldButtons)

  const clickHandler = (e: any) => {

    const updatedFieldButtons = fieldButtonsState.map((fieldButton) => {
      if (fieldButton.label === label) {
        const updatedButtons = fieldButton.buttons.map((button) => {
          if (button.btn === e) {
            return { ...button, selected: true };
          } else {
            return { ...button, selected: false };
          }
        });
  
        return { ...fieldButton, buttons: updatedButtons };
      } else {
        return fieldButton;
      }
    })
  
    setFieldButtonsState(updatedFieldButtons);
    
    if (label == "Fuel") {
      setCarsFormData?.((prev) => ({ ...prev, fuel: e, }));
    }
    if (label == "Transmission") {
      setCarsFormData?.((prev) => ({ ...prev, transmission: e }));
    }
    setPropertiesFormData?.((prev) => {
      if(label=="Type"){
        return ({...prev,type : e})
      }
      if(label=="Bedrooms"){
        return ({...prev,bedrooms : e})
      }
      if(label=="Bathrooms"){
        return ({...prev,bathrooms : e})
      }
      if(label=="Furnishing"){
        return ({...prev,furnishing : e})
      }
      if(label=="Construction Status"){
        return ({...prev,constructionStatus : e})
      }
      if(label=="Listed By"){

        return ({...prev,listedBy : e})
      }
      if(label=="Car Parking"){

        return ({...prev,carParking : e})
      }
      return prev
    }
      )
  };
  // useEffect(()=>{
  //  console.log(fieldButtonsState);
  // },[fieldButtonsState])
  return (
    <>
      <Label htmlFor="type">{label}*</Label>
      <div className="category-buttons-group ">
        {fieldButtonsState
          .find((ele) => ele.label == label)
          ?.buttons.map((e,i) => (
            <Button
            className={`${e.selected ? " border-black" : ""}`}
              onClick={() => clickHandler(e.btn)}
            >
              {e.btn}
            </Button>
          ))}
      </div>
    </>
  );
}

export default PropertyFieldButtons;
