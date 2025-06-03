import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "john@doe.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@doe.com",
    },
  });
}

main().finally(() => prisma.$disconnect());
