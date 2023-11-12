import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { fieldButtons } from '@/lib/utils'

type props = {
    label : string
}

function FieldButtonGroup({label} : props) {
  return (
    <>
    <Label htmlFor="type">{label}*</Label>
      <div className="category-buttons-group ">
        {fieldButtons
          .find((e) => e.label == label)
          ?.buttons.map((e) => (
            <Button className="hover:bg-slate-100">{e}</Button>
            ))}
      </div>
            </>
  )
}

export default FieldButtonGroup