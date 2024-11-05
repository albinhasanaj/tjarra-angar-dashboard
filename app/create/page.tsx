"use client"
import Divider from '@/components/Divider'
import React, { useState } from 'react'

const Create = () => {
    const [input, setInput] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        setIsIncorrect(false) // Reset warning when the user types
    }

    const handleAccess = (e: React.FormEvent) => {
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
                        <h3 className='text-white mb-5'>Create task</h3>
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

                            <label htmlFor="description" className='block text-white mt-4'>Description</label>
                            <textarea id="description" className='border p-2 w-full h-40'></textarea>

                            <label htmlFor="image" className='block text-white mt-4'>Upload Image</label>
                            <input type="file" id="image" className='border p-2 w-full text-white cursor-pointer' accept="image/*" />

                            <button type="submit" className='bg-secondary text-black px-4 py-2 mt-4'>Create</button>
                        </form>
                    </div>

                </div>

            )}
        </div>
    )
}

export default Create
