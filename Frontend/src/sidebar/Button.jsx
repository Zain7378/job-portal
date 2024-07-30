import React from 'react'

function Button({onclickHandler , value , title}) {
  return (
    <button onClick={onclickHandler} value={value} className='px-4 py-1 border text-base hover:bg-blue-500 hover:text-white'>
        {title}
    </button>
  )
}

export default Button