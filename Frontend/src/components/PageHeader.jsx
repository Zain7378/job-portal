import React from 'react'

function PageHeader({title,path}) {
  return (
    <div className='pageHeader-container'>
        <div >

            <h2 className='pageHeader-heading'>
                {title}
            </h2>
            <p className='pageHeader-paragraph'>
                <a href="/">Home</a>/Salary
            </p>
        </div>
    </div>
  )
}

export default PageHeader