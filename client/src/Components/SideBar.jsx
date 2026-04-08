import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SideBar = () => {

    const [note, setNote] = useState("")
    const [notes, setNotes] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState("")

    const handleDelete = (indexToDelete) => {
        setNotes(notes.filter((_, index) => index !== indexToDelete))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (note.trim() === "") return
        setNotes([...notes, note])
        setNote("")
    }

    const handleSave = () => {
        const updated = [...notes]
        updated[editIndex] = editText
        setNotes(updated)
        setEditIndex(null)
        setEditText("")
    }

    return (
        <div className='flex flex-col h-full px-5 py-6 bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg'>

            {/* Title */}
            <h1 className='text-2xl font-bold mb-5 text-gray-700 tracking-wide'>
                ✨ Your Notes
            </h1>

            {/* Input */}
            <form onSubmit={handleSubmit} className='mb-5'>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Write something beautiful...'
                    className='w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                />

                <button
                    type='submit'
                    className='mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all duration-300'
                >
                    + Add Note
                </button>
            </form>

            {/* Notes List */}
            <div className='flex-1 overflow-y-auto space-y-3 pr-1'>

                <AnimatePresence>
                    {notes.map((n, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className='bg-white p-3 rounded-xl shadow-md flex justify-between items-center'
                        >

                            {editIndex === index ? (
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className='border px-2 py-1 text-sm rounded-md w-full mr-2'
                                    autoFocus
                                />
                            ) : (
                                <p className='text-sm text-gray-700'>
                                    {n}
                                </p>
                            )}

                            <div className='flex gap-2 ml-2'>

                                {editIndex === index ? (
                                    <button
                                        onClick={handleSave}
                                        className='bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded-md transition'
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditIndex(index)
                                            setEditText(n)
                                        }}
                                        className='bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded-md transition'
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(index)}
                                    className='bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition'
                                >
                                    Delete
                                </button>

                            </div>

                        </motion.div>
                    ))}
                </AnimatePresence>

            </div>

        </div>
    )
}

export default SideBar