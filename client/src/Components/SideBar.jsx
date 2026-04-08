

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit, FiTrash2, FiSave } from 'react-icons/fi'

const SideBar = ({ selectedDate, notesByDate, setNotesByDate, theme }) => {

    const [note, setNote] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState("")

    const dateKey = selectedDate.toISOString().split("T")[0]
    const notes = notesByDate[dateKey] || []

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!note.trim()) return

        setNotesByDate({
            ...notesByDate,
            [dateKey]: [...notes, note]
        })

        setNote("")
    }

    const handleDelete = (i) => {
        const updatedNotes = notes.filter((_, index) => index !== i)

        setNotesByDate({
            ...notesByDate,
            [dateKey]: updatedNotes
        })
    }

    const handleSave = () => {
        const updated = [...notes]
        updated[editIndex] = editText

        setNotesByDate({
            ...notesByDate,
            [dateKey]: updated
        })

        setEditIndex(null)
    }

    const cardTheme = theme === "dark"
      ? "bg-[#0f172a] border-gray-700"
      : "bg-black/30 border-white/20 backdrop-blur-md"

    return (
        <div className='flex flex-col h-full p-4 md:p-5'>

            <h1 className='text-lg md:text-xl font-semibold mb-2'>Notes</h1>

            <p className='text-xs text-gray-400 mb-4'>
                {selectedDate.toDateString()}
            </p>

            <form onSubmit={handleSubmit} className='mb-4'>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Write something...'
                    className={`w-full p-2 md:p-3 rounded-xl text-sm ${cardTheme}`}
                />

                <button className='mt-2 w-full bg-purple-500 py-2 rounded-xl'>
                    Add Note
                </button>
            </form>

            <div className='flex-1 overflow-y-auto space-y-2 md:space-y-3'>

                <AnimatePresence>
                    {notes.map((n, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className={`${cardTheme} p-3 rounded-xl flex justify-between items-center`}
                        >

                            {editIndex === index ? (
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className='bg-transparent border-b w-full mr-2'
                                />
                            ) : (
                                <p className='text-xs md:text-sm'>{n}</p>
                            )}

                            <div className='flex gap-2'>
                                {editIndex === index ? (
                                    <button onClick={handleSave}><FiSave /></button>
                                ) : (
                                    <button onClick={() => {
                                        setEditIndex(index)
                                        setEditText(n)
                                    }}>
                                        <FiEdit />
                                    </button>
                                )}

                                <button onClick={() => handleDelete(index)}>
                                    <FiTrash2 />
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