import React from "react";
import Movie from "./Movie";

function MovieList({ movies, handleSelectedMovie }) {
  return (
    <ul className="list list-movies scrollbar-hide">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedMovie={handleSelectedMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
