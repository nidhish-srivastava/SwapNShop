import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import DropDowns from './DropDown'

function Bikes() {
  return (
    <>
    <DropDowns label='Bike' />
    <Label htmlFor="year">Year*</Label>
    <Input type="number" />
    <div>
    <Label htmlFor="KM Driven">KM Driven*</Label>
    <Input type="number" />
  </div>
    </>
  )
}

export default Bikes