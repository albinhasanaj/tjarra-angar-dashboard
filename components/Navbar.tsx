import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Divider from './Divider'

const Navbar = () => {
    return (
        <div>
            <nav className='flex flex-col gap-4 mt-4'>
                <div className='flex gap-2 justify-center items-center'>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={32}
                        height={32}
                        className='mt-1'
                    />
                    <h1 className='text-[24px] font-bold text-[#C1F17E]'>Tjarra Angar</h1>
                </div>
                <div>
                    <ul className='flex gap-14 justify-center'>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Albin</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Marcus</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Simon</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Elias</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Jim</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Oscar</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Leo</li>
                        </Link>
                        <Link href='/'>
                            <li className='text-[#fff] text-[16px] font-semibold cursor-pointer hover:underline'>Axel</li>
                        </Link>
                    </ul>
                </div>
                <Divider />
            </nav >
        </div>
    )
}

export default Navbar