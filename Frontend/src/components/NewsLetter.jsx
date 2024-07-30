import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa'

function NewsLetter() {
  return (
    <>
    <div className='space-y-20'>
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelopeOpenText />
                Email me for Jobs</h3>
                <p className='text-black/70 text-base mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, illum?
                </p>
                <div>
                    <input type="email"  name='email' placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
                    <input type="submit" value="Subscribe"  className='w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold' />
                </div>
        </div>
        <div >
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaRocket />
                Get noticed faster</h3>
                <p className='text-black/70 text-base mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, illum?
                </p>
                <div className='w-full space-y-4' >
                   
                    <input type="submit" value="Upload your resume"  className='w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold' />
                </div>
        </div>
    </div>
    </>
  )
}

export default NewsLetter