import { useState } from "react";
import React from "react";
import Navbar from "./childComponents/Navbar";
import Main from "./childComponents/Main";
import NumResult from "./childComponents/NumResult";
import MovieList from "./childComponents/MovieList";
import Box from "./childComponents/Box";
import WatchedSummary from "./childComponents/WatchedSummary";
import WatchedMovieList from "./childComponents/WatchedMovieList";
import Loader from "./childComponents/Loader";
import ErrorMessage from "./childComponents/ErrorMessage";
import Search from "./childComponents/Search";
import MovieDetails from "./childComponents/MovieDetails";
import useMovies from "./customHooks/useMovies";
import useLocalStoredState from "./customHooks/useLocalStoredState";

const KEY = "9a669649";
function App() {
  const [query, setQuery] = useState("");
  const [selctedMovie, setSelectedMovie] = useState(null);
  const { movies, isLoding, error } = useMovies(query, KEY);
  const [watched, setWatched] = useLocalStoredState([], "watched");
  function handleDeleteWatched(id) {
    setWatched((cur) => cur.filter((wat) => wat.imbdID !== id));
  }
  function handleSelectedMovie(id) {
    setSelectedMovie((selctedId) => (selctedId === id ? null : id));
  }
  function handleBack() {
    setSelectedMovie(null);
  }
  function handleAdd(value) {
    setWatched((cur) => [...cur, value]);
    setSelectedMovie(null);
  }
  return (
    <>
      <Navbar>
        <Search setQuery={setQuery} query={query} />
        <NumResult movies={movies} />
      </Navbar>
      {/* for solve the problem of prop drilling */}
      <Main>
        <Box>
          {!isLoding && !error && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {isLoding && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selctedMovie ? (
            <MovieDetails
              onHandleBack={handleBack}
              selctedMovie={selctedMovie}
              KEY={KEY}
              onAdd={handleAdd}
              watched={watched}
            />
          ) : (
            <>
              {" "}
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatced={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
