import React from 'react'
import Inputfield from '../components/Inputfield'

function WorkExperience({handleChange}) {
  return (
    <div>
    <h4 className='text-xl font-medium mb-2'>Work Experience</h4>
    <div>
      <label className='sidebar-label-container'>
        <input type="radio" name="Experince" value="any experience" onChange={handleChange} />
        <span className='checkmark'></span>Any experience
      </label>
      <Inputfield handleChange={handleChange} name="Experince" value='internship' title='Internship' />
      <Inputfield handleChange={handleChange} name="Experince" value='work remotely' title='Work Remotely' />
     
    </div>
  </div>
  )
}

export default WorkExperience