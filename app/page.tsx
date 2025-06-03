import { getTopMovies } from "@/lib/get-top-movies";
import { getUserFavorites } from "@/lib/get-user-favorites";
import { Star } from "lucide-react";
import AddFavoriteButton from "@/components/add-to-favorites";
import Image from "next/image";

export default async function Home() {
  const movies = await getTopMovies();
  const userId = 1;
  const favorites = await getUserFavorites(userId);
  const favoriteIds = new Set(favorites.map((fav) => fav.imdbID));

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Trending Movies
          </h1>
          <p className="text-xl text-neutral-600">
            Discover the latest trending movies and add your favorites
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="rounded-lg border border-neutral-200 overflow-hidden shadow"
            >
              <div className="relative">
                {movie.Poster !== "N/A" ? (
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    width={300}
                    height={400}
                    className="w-full h-[300px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center">
                    <span className="text-sm text-gray-700">No image</span>
                  </div>
                )}
                <AddFavoriteButton
                  movie={movie}
                  isInitiallyFavorite={favoriteIds.has(movie.imdbID)}
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {movie.Title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{movie.Year}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.imdbRating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
