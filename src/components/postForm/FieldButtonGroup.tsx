import React from "react";
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

function FieldButtonGroup({ label, setCarsFormData, setPropertiesFormData }: props) {
  const clickHandler = (e: any) => {
    if (label == "Fuel") {
      setCarsFormData?.((prev) => ({ ...prev, fuel: e }));
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
  return (
    <>
      <Label htmlFor="type">{label}*</Label>
      <div className="category-buttons-group ">
        {fieldButtons
          .find((e) => e.label == label)
          ?.buttons.map((e) => (
            <Button
              className="hover:bg-slate-100"
              onClick={() => clickHandler(e)}
            >
              {e}
            </Button>
          ))}
      </div>
    </>
  );
}

export default FieldButtonGroup;
