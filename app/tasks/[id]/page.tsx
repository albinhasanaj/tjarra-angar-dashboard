// app/tasks/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';


const prisma = new PrismaClient();

interface TaskProps {
    params: Promise<{ id: string }>;
}

// Fetch task data based on the dynamic ID
async function getTask(id: string) {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(id, 10) },
        include: { assignee: true },
    });
    return task;
}

// Generate metadata for the page
export async function generateMetadata({ params }: TaskProps): Promise<Metadata> {
    const { id } = await params;
    const task = await getTask(id);
    if (!task) {
        return { title: 'Task Not Found' };
    }
    return { title: task.title };
}

// Main component to display task details
const TaskPage = async ({ params }: TaskProps) => {
    const { id } = await params;
    const task = await getTask(id);

    if (!task) {
        notFound();
    }

    // const formattedDate = format(new Date(task.createdAt), 'do MMMM yyyy', { locale: sv });

    return (
        <main className="flex flex-col items-center text-white mt-20 px-4">
            <h1 className="text-2xl mb-4">{task.title}</h1>
            <p className="text-lg mb-2">Assigned to: {task.assignee.name}</p>
            <p className="text-sm text-gray-500 mb-4">
                {new Date(task.createdAt).toLocaleDateString()}
            </p>
            <div
                className="prose prose-invert text-xl flex flex-col items-center max-w-[1000px] text-left mb-20"
                dangerouslySetInnerHTML={{ __html: task.content || 'No content available.' }}
            />

            {/* Go Back button */}
            <Link href="/">
                <div className="bg-secondary py-3 px-10 rounded-md fixed top-0 left-0 mt-10 ml-10">
                    <h3 className="text-black">Go Back</h3>
                </div>
            </Link>
        </main>
    );
};

export default TaskPage;
