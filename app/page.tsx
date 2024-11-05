import Card from '@/components/Card'
import Divider from '@/components/Divider'
import Link from 'next/link'
import React from 'react'

const Homepage = () => {
  return (
    <main className="flex flex-col items-center text-white mt-20 px-4">
      <Link href="/create" className='mb-20'>
        <div className='bg-secondary py-3 px-10 rounded-md'>
          <h3 className='text-black '>Create new task</h3>
        </div>
      </Link>
      <h3 className="text-xl mb-4">Tasks assigned by date</h3>
      <Divider />

      <div className="flex flex-col gap-8 mt-10 w-full max-w-[1000px] mx-auto">
        <Card
          name="Albin"
          date="2022-01-01"
          title="Skapa Karl"
          description="Skapa en Karl som ser ut som Karl och heter Karl utan att vara riktiga Karl för a...1"
          isDone={false}
        />

        <Card
          name="Marcus"
          date="2022-01-01"
          title="Skapa Karl"
          description="Skapa en Karl som ser ut som Karl och heter Karl utan att vara riktiga Karl för a...1"
          isDone={true}
        />

        <Card
          name="Simon"
          date="2022-01-01"
          title="Skapa Karl"
          description="Skapa en Karl som ser ut som Karl och heter Karl utan att vara riktiga Karl för a...1"
          isDone={false}
        />

        <Card
          name="Elias"
          date="2022-01-01"
          title="Skapa Karl"
          description="Skapa en Karl som ser ut som Karl och heter Karl för a...1"
          isDone={true}
        />
      </div>
    </main>
  )
}

export default Homepage
