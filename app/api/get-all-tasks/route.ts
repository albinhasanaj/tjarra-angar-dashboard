// app/api/get-all-tasks/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Retrieve all tasks, sorted by completion status and date
        const tasks = await prisma.task.findMany({
            orderBy: [
                { completed: 'asc' }, // Unchecked tasks appear first
                { createdAt: 'asc' }  // Then sort by date within each group
            ],
            include: {
                assignee: true, // Includes assignee details
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}
