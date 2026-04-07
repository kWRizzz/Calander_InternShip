import React, { useState } from 'react'

const SideBar = () => {

    const [note, setNote] = useState("")
    const [notes, setNotes] = useState([])

    const handleDelete = (indexToDelete) => {
        const Update= notes.filter((_,index)=>index!==indexToDelete)
        setNotes(Update)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (note.trim() === "") return
        setNotes([...notes, note])
        setNote("")
        console.log(notes);

    }

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
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className='rounded-lg px-1'
                        placeholder='Your Thought'
                    />
                </div>

                <div>
                    <input
                        onClick={handleSubmit}
                        className=' bg-slate-400 rounded-lg px-2 py-1'
                        type="submit"
                    />
                </div>


                {/* Notes List */}
                <div className='flex-1 overflow-y-auto'>
                    {notes.map((n, index) => (
                        <div
                        className='flex justify-between items-center mb-2 '
                            key={index}
                        >
                            <p
                                className='text-sm mb-2 border-b pb-1'>
                                • {n}
                            </p>

                            <button
                            onClick={()=>handleDelete(index)}
                                className=' bg-red-600 text-xs rounded-lg px-2 py-1'
                            >
                                Delete
                            </button>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
}

export default SideBar