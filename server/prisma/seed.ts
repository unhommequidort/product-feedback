import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.status.deleteMany();
  await prisma.userRole.deleteMany();
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
    },
  });

  const matt = await prisma.user.upsert({
    where: { username: '@unhommequidort' },
    update: {},
    create: {
      username: '@unhommequidort',
      firstName: 'Matthew',
      lastName: 'Lyons',
      userRole: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  });

  const jean = await prisma.user.upsert({
    where: { username: '@NYHeraldTrubune' },
    update: {},
    create: {
      username: '@NYHeraldTrubune',
      firstName: 'Jean',
      lastName: 'Seberg',
      userRole: {
        create: {
          roleId: userRole.id,
        },
      },
    },
  });

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

  console.log({ matt, jean, categories, statuses });
}

seed();
