import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.task.deleteMany();
    await prisma.assignee.deleteMany();

    // Seed assignees
    const assignees = [
        { name: 'Albin' },
        { name: 'Marcus' },
        { name: 'Simon' },
        { name: 'Elias' },
        { name: 'Jim' },
        { name: 'Oscar' },
        { name: 'Leo' },
        { name: 'Axel' },
    ];

    for (const assignee of assignees) {
        await prisma.assignee.upsert({
            where: { name: assignee.name },
            update: {},
            create: assignee,
        });
    }

    // Fetch each assignee by name for task assignment
    const albin = await prisma.assignee.findUnique({ where: { name: 'Albin' } });
    const marcus = await prisma.assignee.findUnique({ where: { name: 'Marcus' } });
    const elias = await prisma.assignee.findUnique({ where: { name: 'Elias' } });
    const jim = await prisma.assignee.findUnique({ where: { name: 'Jim' } });

    // Seed tasks with HTML content and correct assigneeId
    const tasks = [
        {
            title: 'Complete Project Proposal',
            description: 'Prepare the initial project proposal document for review.',
            content: `<p>Outline the objectives, scope, and deliverables for the project.</p><img src="/uploads/test.png" alt="Task Image" /><p>Ensure all details are included.</p>`,
            assigneeId: albin?.id,
            completed: false,
        },
        {
            title: 'Design UI Mockups',
            description: 'Create high-fidelity UI mockups for the main screens.',
            content: `<p>Outline the objectives, scope, and deliverables for the project.</p><img src="/uploads/test.png" alt="Task Image" /><p>Ensure all details are included.</p>`,
            assigneeId: marcus?.id,
            completed: false,
        },
        {
            title: 'Database Schema Design',
            description: 'Design and document the initial database schema.',
            content: `<p>Outline the objectives, scope, and deliverables for the project.</p><img src="/uploads/test.png" alt="Task Image" /><p>Ensure all details are included.</p>`,
            assigneeId: elias?.id,
            completed: true,
        },
        {
            title: 'Code Review and Refactoring',
            description: 'Review the code and suggest improvements.',
            content: `<p>Outline the objectives, scope, and deliverables for the project.</p><img src="/uploads/test.png" alt="Task Image" /><p>Ensure all details are included.</p>`,
            assigneeId: jim?.id,
            completed: true,
        },
    ];

    for (const task of tasks) {
        if (task.assigneeId) {
            await prisma.task.create({
                data: {
                    title: task.title,
                    description: task.description,
                    content: task.content,
                    assigneeId: task.assigneeId,
                    completed: task.completed,
                },
            });
        }
    }
}



const seedDB = async () => {
    main()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

const clearDB = async () => {
    await prisma.task.deleteMany();
    await prisma.assignee.deleteMany();
    await prisma.$disconnect();
}

clearDB();


const seedAssignees = async () => {
    const assignees = [
        { name: 'Albin' },
        { name: 'Marcus' },
        { name: 'Simon' },
        { name: 'Elias' },
        { name: 'Jim' },
        { name: 'Oscar' },
        { name: 'Leo' },
        { name: 'Axel' },
    ];

    for (const assignee of assignees) {
        await prisma.assignee.upsert({
            where: { name: assignee.name },
            update: {},
            create: assignee,
        });
    }
}

seedAssignees();