// app/page.tsx
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';

interface Task {
  id: string;
  assignee?: {
    name?: string;
  };
  createdAt: string;
  title: string;
  description?: string;
  completed: boolean;
}


const Homepage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-all-tasks`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    // Optionally, handle the error in the UI
    return;
  }

  let tasks: Task[] = [];
  try {
    tasks = await res.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Optionally, handle the error in the UI
    return;
  }


  return (
    <main className="flex flex-col items-center text-white mt-20 px-4">
      <h3 className="text-xl mb-20">Tasks assigned by date</h3>
      <Divider />

      <div className="flex flex-col gap-8 mt-10 w-full max-w-[1000px] mx-auto mb-20">
        {tasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            name={task.assignee?.name || 'No Assignee'}
            date={new Date(task.createdAt).toLocaleDateString()}
            title={task.title}
            isDone={task.completed}
          />
        ))}
      </div>
    </main>
  );
};

export default Homepage;
