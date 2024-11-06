import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
