// app/tasks/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TaskProps {
    params: Promise<{ id: string }>;
}


// Fetch task data from the Express API
async function getTask(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-task/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error(`Error fetching task: ${res.statusText}`);
        return null;
    }

    try {
        const task = await res.json();
        return task;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
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

    return (
        <main className="flex flex-col items-center text-white mt-20 px-4">
            <h1 className="text-2xl mb-4">{task.title}</h1>
            <p className="text-lg mb-2">Assigned to: {task.assignee.name}</p>
            <time dateTime={task.createdAt} className="text-sm text-gray-500 mb-4">
                {new Date(task.createdAt).toLocaleDateString()}
            </time>
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
