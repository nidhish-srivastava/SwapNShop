import React from 'react'
import Brand from './Brand'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function Bikes() {
  return (
    <>
    <Brand/>
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