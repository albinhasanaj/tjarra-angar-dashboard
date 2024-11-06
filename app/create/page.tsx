"use client"
import Divider from '@/components/Divider'
import React, { useState } from 'react'

const Create = () => {
    const [input, setInput] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)

    // New state variables
    const [contentBlocks, setContentBlocks] = useState([])
    const [currentText, setCurrentText] = useState("")

    const handleInputChange = (e) => {
        setInput(e.target.value)
        setIsIncorrect(false) // Reset warning when the user types
    }

    const handleAccess = (e) => {
        e.preventDefault()

        // LÖSENORDET ÄR HÄR
        const correctPassword = "joel"
        // LÖSENORDET ÄR HÄR

        if (input === correctPassword) {
            setIsAuthorized(true)
            setIsIncorrect(false)
        } else {
            setIsIncorrect(true)
        }
    }

    const handleAddTextBlock = () => {
        if (currentText.trim() !== "") {
            setContentBlocks([...contentBlocks, { type: 'text', content: currentText }])
            setCurrentText("")
        }
    }

    const handleAddImageBlock = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setContentBlocks([...contentBlocks, { type: 'image', content: reader.result }])
            }
            reader.readAsDataURL(file)
        }
        // Reset the file input so the same image can be uploaded again if needed
        e.target.value = ''
    }

    return (
        <div className="mx-auto">
            {!isAuthorized ? (
                <div className="mt-[200px] flex flex-col items-center max-w-[1440px] mx-auto">
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Enter Password for Access:</label>
                    <div>
                        <form
                            onSubmit={handleAccess}
                            className="flex"
                        >
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter password here...'
                                value={input}
                                onChange={handleInputChange}
                                className="border p-2 w-[560px]"
                            />
                            <button type="submit" className="bg-secondary text-black px-4 py-2">Access</button>
                        </form>
                        {isIncorrect && (
                            <p className='text-red-500 text-[20px]'>FEL LÖSENORD DU FÅR INTE KOMMA IN!!!!</p>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className='mt-16 max-w-[1440px] mx-auto px-5'>
                        <h3 className='text-white mb-5'>Create Task</h3>
                    </div>
                    <Divider />
                    <div>
                        <form className='my-10 max-w-[1440px] mx-auto px-5'>
                            <label htmlFor="name" className='block text-white'>Name</label>
                            <select id="name" className='border p-2 w-full'>
                                <option value="">Select a name</option>
                                <option value="Albin">Albin</option>
                                <option value="Marcus">Marcus</option>
                                <option value="Simon">Simon</option>
                                <option value="Elias">Elias</option>
                                <option value="Jim">Jim</option>
                                <option value="Oscar">Oscar</option>
                                <option value="Leo">Leo</option>
                                <option value="Axel">Axel</option>
                            </select>

                            <label htmlFor="title" className='block text-white mt-4'>Title</label>
                            <input type="text" id="title" className='border p-2 w-full' />

                            <label htmlFor="date" className='block text-white mt-4'>Date</label>
                            <input type="date" id="date" className='border p-2 w-full' />

                            {/* Dynamic Content Blocks */}
                            <label className='block text-white mt-4'>Content</label>
                            <div className='border p-2 w-full'>
                                {contentBlocks.map((block, index) => (
                                    <div key={index} className='my-2'>
                                        {block.type === 'text' && <p className='text-white'>{block.content}</p>}
                                        {block.type === 'image' && <img src={block.content} alt={`Uploaded ${index}`} className='max-w-full' />}
                                    </div>
                                ))}
                            </div>

                            {/* Input for adding text */}
                            <textarea
                                value={currentText}
                                onChange={(e) => setCurrentText(e.target.value)}
                                className='border p-2 w-full h-20 mt-2'
                                placeholder='Enter text here...'
                            ></textarea>
                            <button type="button" onClick={handleAddTextBlock} className='bg-secondary text-black px-4 py-2 mt-2'>Add Text</button>

                            {/* Input for adding image */}
                            <label htmlFor="image" className='block text-white mt-4'>Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                className='border p-2 w-full text-white cursor-pointer'
                                accept="image/*"
                                onChange={handleAddImageBlock}
                            />

                            <button type="submit" className='bg-secondary text-black px-4 py-2 mt-4'>Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Create
