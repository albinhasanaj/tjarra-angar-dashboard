"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiFillClockCircle } from 'react-icons/ai'
import toast from 'react-hot-toast'

const Card = ({ name, id, date, title, initialStatus }: { name: string, date: string, title: string, initialStatus: string, id: string }) => {
    const [status, setStatus] = useState(initialStatus);

    const handleStatus = async () => {
        let newStatus;

        if (status === 'NOT_DONE') {
            newStatus = 'ONGOING';
        } else if (status === 'ONGOING') {
            newStatus = 'COMPLETED';
        } else {
            newStatus = 'NOT_DONE';
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-task/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setStatus(newStatus);
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

                <div className="flex justify-center md:justify-end">
                    {status === 'NOT_DONE' ? (
                        <AiOutlineCloseCircle onClick={handleStatus} className="text-red-500 text-4xl cursor-pointer hover:scale-105 transition-all duration-300" />
                    ) : status === 'ONGOING' ? (
                        <AiFillClockCircle onClick={handleStatus} className="text-yellow-500 text-4xl cursor-pointer hover:scale-105 transition-all duration-300" />
                    ) : (
                        <AiOutlineCheckCircle onClick={handleStatus} className="text-green-500 text-4xl cursor-pointer hover:scale-105 transition-all duration-300" />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Card
