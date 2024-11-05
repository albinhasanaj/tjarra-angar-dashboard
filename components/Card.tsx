"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

const Card = ({ name, date, title, description, isDone }: { name: string, date: string, title: string, description: string, isDone: boolean }) => {
    const [done, setDone] = useState(isDone)

    const handleDone = () => {
        setDone(!done)
    }

    return (
        <div className="w-full bg-white py-6 px-4 md:px-8 rounded-lg shadow-md flex flex-col md:grid md:grid-cols-4 gap-4 items-center text-gray-800">
            {/* Name and Date Section */}
            <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{name}</p>
                <p className="text-sm text-gray-500">{date}</p>
            </div>

            {/* Title and Description Section */}
            <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* View More Link */}
            <div className="text-center md:text-right">
                <Link href="#" className="text-blue-500 underline hover:text-blue-600 transition-colors duration-200">
                    View more
                </Link>
            </div>

            {/* Status Icon with onClick */}
            <div className="flex justify-center md:justify-end">
                {done ? (
                    <AiOutlineCheckCircle onClick={handleDone} className="text-green-500 text-4xl cursor-pointer hover:scale-105 transition-all duration-300" />
                ) : (
                    <AiOutlineCloseCircle onClick={handleDone} className="text-red-500 text-4xl cursor-pointer hover:scale-105 transition-all duration-300" />
                )}
            </div>
        </div>
    )
}

export default Card
