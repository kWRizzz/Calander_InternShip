import React, { useState } from 'react'

const SideBar = () => {

    const [notes, setNotes] = useState([])

  return (
    <div
        className='flex flex-col justify-center items-center py-2 px-5'
    >   
    {/* screen */}
        <div>
            <h1
                className=' headingText text-3xl font-bold text-center'
            >
                Your Notes
            </h1>
        </div>


        {/* Your Notes */}
        <div
            className=''
        >   

            {/* Input */}
            <div
                className='rounded-lg flex justify-center items-center'
            >
                <textarea 
                    className='rounded-lg px-1'
                    placeholder='Your Thought'
                />
            </div>
        </div>
    </div>
  )
}

export default SideBar