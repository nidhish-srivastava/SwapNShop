import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import DropDowns from './DropDown'
import { bikeSchema } from '@/lib/actions/post.actions'



type bikeProps = {
  bikesFormData: bikeSchema;
  setBikesFormData: React.Dispatch<React.SetStateAction<bikeSchema>>;
}


function Bikes({bikesFormData,setBikesFormData}:bikeProps) {
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBikesFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
    <DropDowns label='Bike' setValue={setBikesFormData} value={bikesFormData.brand} />
    <Label htmlFor="year">Year*</Label>
    <Input type="number" min={0} value={bikesFormData.year} onChange={changeHandler} name='year' />
    <div>
    <Label htmlFor="KM Driven">KM Driven*</Label>
    <Input type="number" min={0} value={bikesFormData.kmDriven} onChange={changeHandler} name='kmDriven'/>
  </div>
    </>
  )
}

export default Bikes