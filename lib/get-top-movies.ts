// Eftersom OMDB's API inte har en endpoint för "trending" eller "popular" så simulerar jag en topplista lite enkelt här.

const API_KEY = process.env.OMDB_API_KEY;

const movieIds = [
  "tt0111161",
  "tt0068646",
  "tt0468569",
  "tt0109830",
  "tt1375666",
  "tt0133093",
  "tt0120737",
  "tt0137523",
  "tt0120815",
  "tt0102926",
];

export type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
};

export async function getTopMovies(): Promise<Movie[]> {
  const results = await Promise.all(
    movieIds.map(async (id) => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`, {
        cache: "force-cache",
      });
      return res.json();
    })
  );

  return results.filter((movie) => movie.Response === "True");
}
