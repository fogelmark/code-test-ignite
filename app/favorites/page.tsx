import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { Star } from "lucide-react";

const prisma = new PrismaClient();

export default async function Page() {
  const userId = 1;
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { title: "asc" },
  });

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4"></h1>
          <p className="text-xl text-neutral-600">
            Here are the movies you've added to your favorites
          </p>
        </section>

        {favorites.length === 0 ? (
          <p className="text-center text-neutral-500">
            You haven&apos;t added any favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="rounded-lg border border-neutral-200 overflow-hidden shadow"
              >
                <div className="relative">
                  {movie.poster !== "N/A" ? (
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      width={300}
                      height={400}
                      className="w-full h-[300px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center">
                      <span className="text-sm text-gray-700">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{movie.year}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{movie.imdbRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
