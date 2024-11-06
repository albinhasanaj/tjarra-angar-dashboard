// app/page.tsx
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

const Homepage = async () => {
  // Fetch data from the API route
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-tasks`, {
    cache: 'no-store', // Ensures fresh data for each request
  });
  const tasks = await res.json();

  // const formattedDate = format(new Date(), 'do MMMM yyyy', { locale: sv });

  return (
    <main className="flex flex-col items-center text-white mt-20 px-4">
      <h3 className="text-xl mb-4">Tasks assigned by date</h3>
      <Divider />

      <div className="flex flex-col gap-8 mt-10 w-full max-w-[1000px] mx-auto">
        {tasks.map((task: any) => (
          <Card
            key={task.id}
            id={task.id}
            name={task.assignee?.name || 'No Assignee'}
            date={new Date(task.createdAt).toLocaleDateString()}
            title={task.title}
            description={task.description || 'No description provided.'}
            isDone={task.completed}
          />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
