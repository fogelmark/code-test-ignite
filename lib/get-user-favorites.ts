import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserFavorites(userId: number) {
  return await prisma.favorite.findMany({
    where: { userId },
    select: { imdbID: true },
  });
}
