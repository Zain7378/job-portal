import React from 'react';
import Inputfield from '../components/Inputfield';

function Location({ handleChange }) {
  return (
    <>
      <div>
        <h4 className='text-xl font-medium mb-2'>Location</h4>
        <div>
          <label className='sidebar-label-container'>
            <input type="radio" name="location" value="" onChange={handleChange} />
            <span className='checkmark'></span>all
          </label>
          <Inputfield handleChange={handleChange} name="location" value='London' title='London' />
          <Inputfield handleChange={handleChange} name="location" value='Brussels' title='Brussels' />
          <Inputfield handleChange={handleChange} name="location" value='San Francisco' title='San Francisco' />
          <Inputfield handleChange={handleChange} name="location" value='madrid' title='Madrid' />
          <Inputfield handleChange={handleChange} name="location" value='seattle' title='Seattle' />
        </div>
      </div>
    </>
  );
}

export default Location;
