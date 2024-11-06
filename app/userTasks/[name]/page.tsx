// app/userTasks/[name]/page.tsx
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

const prisma = new PrismaClient();

interface UserTasksProps {
    params: { name: string };
}

// Function to fetch tasks for a specific user by name
async function getUserTasks(name: string) {

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const assignee = await prisma.assignee.findFirst({
        where: { name },
        include: { tasks: true },
    });

    // Log the assignee and their tasks for debugging
    console.log('Assignee:', assignee);
    if (assignee) {
        console.log('Tasks:', assignee.tasks);
    } else {
        console.log('No assignee found with this name.');
    }

    return assignee?.tasks || [];
}

const UserTasks: React.FC<UserTasksProps> = async ({ params }) => {
    const { name } = params;
    const tasks = await getUserTasks(name);

    // const formattedDate = format(new Date(), 'do MMMM yyyy', { locale: sv });

    return (
        <main className="flex flex-col items-center text-white mt-20 px-4">
            <h3 className="text-xl mb-4">{name.charAt(0).toUpperCase() + name.slice(1)}'s Tasks</h3>
            <Divider />

            <div className="flex flex-col gap-8 mt-10 w-full max-w-[1000px] mx-auto">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Card
                            key={task.id}
                            id={task.id as any}
                            name={name.charAt(0).toUpperCase() + name.slice(1)} // Capitalize the name
                            date={new Date(task.createdAt).toLocaleDateString()}
                            title={task.title}
                            description={task.description || 'No description provided.'}
                            isDone={task.completed}
                        />
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-400">No tasks found for {name.charAt(0).toUpperCase() + name.slice(1)}.</p>
                )}
            </div>
        </main>
    );
};

export default UserTasks;
