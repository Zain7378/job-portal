import React from 'react'
import Inputfield from '../components/Inputfield'

function JobPosingDate({handleChange}) {
  const now = new Date();
  const twentyFour = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDays = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDays = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const twentyFourHoursAgo = twentyFour.toISOString().slice(0, 10);
  const sevenDaysAgo = sevenDays.toISOString().slice(0, 10);
  const thirtyDaysAgo = thirtyDays.toISOString().slice(0, 10);

  return (
    <>
      <div>
        <h4 className='text-xl font-medium mb-2'>Date of Posting</h4>
        <div>
          <label className='sidebar-label-container'>
            <input type="radio" name="timeRange" value="" onChange={handleChange} />
            <span className='checkmark'></span>All Time
          </label>
          <Inputfield handleChange={handleChange} name="timeRange" value={twentyFourHoursAgo} title='Last 24 Hours' />
          <Inputfield handleChange={handleChange} name="timeRange" value={sevenDaysAgo} title='7 Days Ago' />
          <Inputfield handleChange={handleChange} name="timeRange" value={thirtyDaysAgo} title='30 Days Ago' />
        </div>
      </div>
    </>
  )
}

export default JobPosingDate
