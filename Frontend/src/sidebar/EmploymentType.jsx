import React from 'react'
import Inputfield from '../components/Inputfield'

function EmploymentType({handleChange}) {
  return (
   
    <div>
    <h4 className='text-xl font-medium mb-2'>Type of employement</h4>
    <div>
      <label className='sidebar-label-container'>
        <input type="radio" name="Etype" value="" onChange={handleChange} />
        <span className='checkmark'></span>Any experience
      </label>
      <Inputfield handleChange={handleChange} name="Etype" value='full-time' title='Full-time' />
      <Inputfield handleChange={handleChange} name="Etype" value='part-time' title='Part-time' />
      <Inputfield handleChange={handleChange} name="Etype" value='temporary' title='Temporary' />
     
    </div>
  </div>
  )
}

export default EmploymentType