"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import toast from 'react-hot-toast'

const Card = ({ name, id, date, title, description, isDone }: { name: string, date: string, title: string, description: string, isDone: boolean, id: string }) => {
    const [done, setDone] = useState(isDone)


    const handleDone = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-task/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !done }),
            });

            if (res.ok) {
                setDone(!done);
                toast.success('Task status updated successfully');
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Something went wrong');
        }
    };



    return (
        <div className="w-full bg-white py-6 px-4 md:px-8 rounded-lg shadow-md flex flex-col md:grid md:grid-cols-4 gap-4 items-center text-gray-800">
            {/* Name and Date Section */}
            <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{name}</p>
                <time dateTime={date} className="text-sm text-gray-500" suppressHydrationWarning>{date}</time>
            </div>

            {/* Title and Description Section */}
            <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            {/* View More Link */}
            <div className="text-center md:text-right">
                <Link href="/tasks/[id]" as={`/tasks/${id}`}
                    className="text-blue-500 underline hover:text-blue-600 transition-colors duration-200">
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
