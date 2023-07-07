import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // await prisma.role.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.status.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'UI',
      },
      {
        name: 'UX',
      },
      {
        name: 'Enhancement',
      },
      {
        name: 'Bug',
      },
      {
        name: 'Feature',
      },
    ],
  });

  const statuses = await prisma.status.createMany({
    data: [
      {
        name: 'Suggestion',
      },
      {
        name: 'Planned',
      },
      {
        name: 'In-Progress',
      },
      {
        name: 'Live',
      },
    ],
  });

  console.log({ categories, statuses });
}

seed();
