"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Divider from './Divider'
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
    const currentPath = usePathname()


    const names = ['Albin', 'Marcus', 'Simon', 'Elias', 'Jim', 'Oscar', 'Leo', 'Axel']

    return (
        <div>
            <nav className='flex flex-col gap-4 mt-4'>
                <Link href='/' className='flex gap-2 justify-center items-center'>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={32}
                        height={32}
                        className='mt-1'
                    />
                    <h1 className='text-xl md:text-2xl font-bold text-secondary'>Tjarra Angar</h1>
                </Link>
                <div>
                    <ul className='flex flex-wrap gap-4 md:gap-14 justify-center'>
                        {names.map((name) => {
                            const namePath = `/${name.toLowerCase()}`
                            const isActive = currentPath === namePath

                            return (
                                <li key={name}>
                                    <Link href={namePath}>
                                        <span
                                            className={`text-base md:text-lg font-semibold cursor-pointer hover:underline ${isActive ? 'text-white' : 'text-gray-500'
                                                }`}
                                        >
                                            {name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <Divider />
            </nav>
        </div>
    )
}

export default Navbar
