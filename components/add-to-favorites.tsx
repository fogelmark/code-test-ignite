/* eslint-disable */

"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Movie } from "@/lib/get-top-movies";

type Props = {
  movie: Movie;
  isInitiallyFavorite: boolean;
};

export default function AddFavoriteButton({
  movie,
  isInitiallyFavorite,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/favorites/${movie.imdbID}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          imdbRating: movie.imdbRating
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Could not update favorite status");
        return;
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="rounded p-2 cursor-pointer bg-neutral-700 hover:bg-neutral-800 text-white absolute top-2 right-2"
    >
      <Heart
        size={16}
        className={`transition-all ${
          isFavorite ? "fill-red-500 stroke-red-500" : "fill-transparent"
        }`}
      />
    </button>
  );
}
