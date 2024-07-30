import React from 'react'
import Button from './Button'
import Inputfield from '../components/Inputfield'

function Salary({handleChange , handleClick}) {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mbb-4'>
        <Button onclickHandler={handleClick} value="Hourly" title="Hourly" />
        <Button onclickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onclickHandler={handleClick} value="Yearly" title="yearly" />

        </div>
        <div className='mt-2'>
        <label className='sidebar-label-container'>
            <input type="radio" name="price" value="" onChange={handleChange} />
            <span className='checkmark'></span>all
          </label>
          <Inputfield handleChange={handleChange} name="price" value='30' title='< 30000k' />
          <Inputfield handleChange={handleChange} name="price" value='50' title='< 50000k' />
          <Inputfield handleChange={handleChange} name="price" value='80' title='< 80000k' />
          <Inputfield handleChange={handleChange} name="price" value='100' title='< 100000k' />

        </div>
    </div>
  )
}

export default Salary