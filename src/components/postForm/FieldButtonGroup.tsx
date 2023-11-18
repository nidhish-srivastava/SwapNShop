import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { fieldButtons } from '@/lib/utils'
import { carSchema } from '@/lib/actions/post.actions'

type props = {
    label : string
  setCarsFormData : React.Dispatch<React.SetStateAction<carSchema>>
}

function FieldButtonGroup({label,setCarsFormData} : props) {
  const clickHandler = (e : any) =>{
    if(label=="Fuel"){
      setCarsFormData((prev)=>({...prev,"fuel": e}))
    }
    if(e=="Transmission"){
      setCarsFormData((prev)=>({...prev,"transmission": e}))
    }
  }
  return (
    <>
    <Label htmlFor="type">{label}*</Label>
      <div className="category-buttons-group ">
        {fieldButtons
          .find((e) => e.label == label)
          ?.buttons.map((e) => (
            <Button className="hover:bg-slate-100" onClick={()=>clickHandler(e)}>{e}</Button>
            ))}
      </div>
            </>
  )
}

export default FieldButtonGroup