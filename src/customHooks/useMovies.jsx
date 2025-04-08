import React, { useEffect, useState } from "react";

function useMovies(query, KEY) {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      setIsLoading(true);
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Somthing went rong with fetching movies");
          const data = await res.json();

          if (data.Response === "False") throw new Error("movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      } else {
        fetchMovies();
        return function () {
          controller.abort();
        };
      }
    },
    [query, KEY]
  );

  return { movies, isLoding, error };
}

export default useMovies;
