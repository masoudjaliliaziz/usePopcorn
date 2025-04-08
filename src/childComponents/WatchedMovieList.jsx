import React, { Component } from "react";
import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watched, onDeleteWatced }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatced={onDeleteWatced}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
