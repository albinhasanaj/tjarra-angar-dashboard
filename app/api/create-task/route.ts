// app/api/create-task/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const date = formData.get('date') as string;
        const contentBlocks = JSON.parse(formData.get('contentBlocks') as string);

        const assignee = await prisma.assignee.findUnique({
            where: { name },
        });

        if (!assignee) {
            return NextResponse.json({ error: 'Assignee not found' }, { status: 404 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                content: '',
                assigneeId: assignee.id,
                completed: false,
                createdAt: new Date(date),
            },
        });

        const uploadsDir = path.join(process.cwd(), 'app', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });

        for (const [index, block] of contentBlocks.entries()) {
            if (block.type === 'image') {
                const fileKey = `image_${index}`;
                const file = formData.get(fileKey) as File;
                if (file) {
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const fileName = `${Date.now()}_${file.name}`;
                    const filePath = path.join(uploadsDir, fileName);

                    await sharp(buffer)
                        .resize(800)
                        .jpeg({ quality: 80 })
                        .toFile(filePath);

                    block.content = `/uploads/${fileName}`;
                }
            }
        }

        const updatedContent = contentBlocks
            .map((block: any) => {
                if (block.type === 'text') {
                    return `<p>${block.content}</p>`;
                } else if (block.type === 'image') {
                    return `<img src="${block.content}" alt="Task Image" />`;
                }
                return '';
            })
            .join('');

        await prisma.task.update({
            where: { id: task.id },
            data: { content: updatedContent },
        });

        return NextResponse.json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
