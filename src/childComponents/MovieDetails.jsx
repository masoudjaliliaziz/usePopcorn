import React, { useEffect, useRef, useState } from "react";
import Rating from "./../Rating";
import Loader from "./Loader";
import useKey from "../customHooks/useKey";
function MovieDetails({ selctedMovie, onHandleBack, KEY, onAdd, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const countRef = useRef(0);
  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);
  const isWatched = watched.map((watch) => watch.imbdID).includes(selctedMovie);
  const watchedUserRating = watched.find(
    (movie) => movie.imbdID === selctedMovie
  )?.userRating;
  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imbdID: selctedMovie,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAdd(newWatchedMovie);
  }
  useEffect(
    function () {
      setIsLoaded(true);
      async function getMoviesDetail() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selctedMovie}`
        );
        const data = await res.json();
        setMovie(data);

        setIsLoaded(false);
      }
      getMoviesDetail();
    },
    [selctedMovie]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },

    [title]
  );
  useKey("Escape", onHandleBack);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         console.log("closing");
  //         onHandleBack();
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onHandleBack]
  // );

  return (
    <div className="details">
      {isLoaded ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onHandleBack}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>{" "}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  {" "}
                  <Rating
                    setMessage={setUserRating}
                    color="yellow"
                    maxRating={10}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleAddWatchedMovie()}
                    >
                      + Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>you voted this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
