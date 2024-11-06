import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function POST(request: Request) {
    // update task to be completed if not, and vice versa
    try {
        const { id } = await request.json();
        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { completed: !task.completed },
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
    }
}