import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '../ui/input'
import FieldButtonGroup from './FieldButtonGroup'

function Cars() {
  return (
    <>
  
    <Label htmlFor="year">Year*</Label>
    <Input type="number" />
    <div>
    </div>
    <div>
  <FieldButtonGroup label='Fuel'/>
    </div>
    <div>
  <FieldButtonGroup label='Transmission' />
    </div>

  <div>
    <Label htmlFor="KM Driven">KM Driven*</Label>
    <Input type="number" />
  </div>
    </>
  )
}

export default Cars