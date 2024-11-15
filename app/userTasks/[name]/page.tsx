// app/userTasks/[name]/page.tsx
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';

interface UserTasksProps {
    params: Promise<{ name: string }>;
}

interface Task {
    id: string;
    createdAt: string;
    title: string;
    status: string;
}


async function getUserTasks(name: string) {
    // Capitalize the first letter of the name
    try {
        // Fetch tasks from the Express API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-tasks/${name}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            // Handle HTTP errors
            console.error(`HTTP error! status: ${res.status}`);
            return [];
        }

        const data = await res.json();

        return data || [];
    } catch (error) {
        // Handle network or parsing errors
        console.error('Error fetching user tasks:', error);
        return [];
    }
}


const UserTasks: React.FC<UserTasksProps> = async ({ params }) => {
    let { name } = await params; // Await the params object


    const tasks: Task[] = await getUserTasks(name);

    // Decode the name if it contains special characters
    if (name.includes('%')) {
        name = decodeURIComponent(name);
    }

    if (!tasks) {
        return <p className="text-center text-lg text-gray-400">Error fetching tasks for {name.charAt(0).toUpperCase() + name.slice(1)}.</p>;
    }

    if (tasks.length === 0) {
        return <p className="text-center text-lg text-gray-400">No tasks found for {name.charAt(0).toUpperCase() + name.slice(1)}.</p>;
    }

    return (
        <main className="flex flex-col items-center text-white mt-20 px-4">
            <h3 className="text-xl mb-4">{name.charAt(0).toUpperCase() + name.slice(1)}'s Tasks</h3>
            <Divider />

            <div className="flex flex-col gap-8 mt-10 w-full max-w-[1000px] mx-auto">
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        id={task.id}
                        name={name.charAt(0).toUpperCase() + name.slice(1)} // Capitalize the name
                        date={new Date(task.createdAt).toLocaleDateString()}
                        title={task.title}
                        initialStatus={task.status}
                    />
                ))}
            </div>
        </main>
    );
};

export default UserTasks;
