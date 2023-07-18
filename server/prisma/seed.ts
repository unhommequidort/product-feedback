import prisma from '../src/libs/prisma';

async function seed() {
  // await prisma.role.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.status.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'UI',
        sort: 1000,
      },
      {
        name: 'UX',
        sort: 2000,
      },
      {
        name: 'Enhancement',
        sort: 3000,
      },
      {
        name: 'Bug',
        sort: 4000,
      },
      {
        name: 'Feature',
        sort: 5000,
      },
    ],
  });

  const statuses = await prisma.status.createMany({
    data: [
      {
        name: 'Suggestion',
        sort: 1000,
      },
      {
        name: 'Planned',
        sort: 2000,
      },
      {
        name: 'In-Progress',
        sort: 3000,
      },
      {
        name: 'Live',
        sort: 4000,
      },
    ],
  });

  console.log({ categories, statuses });
}

seed();
