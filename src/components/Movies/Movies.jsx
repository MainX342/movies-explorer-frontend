import { useEffect, useCallback, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import apiMovies from "../../utils/MoviesApi";

export default function Movies({ setIsError, addMovie, savedMovies }) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [onEnter, setOnEnter] = useState(true);

  const filter = useCallback((search, isCheck, movies) => {
    setFoundMovies(search);
    localStorage.setItem("allmovies", JSON.stringify(movies));
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU
          .toLowerCase()
          .includes(search.toLowerCase());
        return isCheck ? searchName && movie.duration <= 30 : searchName;
      })
    );
  }, []);

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      apiMovies
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          setServerError(false);
          setOnEnter(false);
          filter(search, isCheck, res);
        })
        .catch((err) => {
          setServerError(true);
          console.error(`Ошибка при поиске фильма ${err}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(search, isCheck, allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies);
      const search = JSON.parse(localStorage.movie);
      const isCheck = JSON.parse(localStorage.shorts);
      setServerError(false);
      setOnEnter(false);
      setFoundMovies(search);
      setIsCheck(isCheck);
      setAllMovies(movies);
      filter(search, isCheck, movies);
    }
  }, [filter]);

  function filterShorts() {
    if (isCheck) {
      setIsCheck(false);
      filter(foundMovies, false, allMovies);
      localStorage.setItem("shorts", JSON.stringify(false));
    } else {
      setIsCheck(true);
      filter(foundMovies, true, allMovies);
      localStorage.setItem("shorts", JSON.stringify(true));
    }
  }

  return (
    <>
      <SearchForm
        isCheck={!isCheck}
        searchMovies={searchMovies}
        foundMovies={foundMovies}
        filterShorts={filterShorts}
        setIsError={setIsError}
        isLoading={isLoading}
      />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        onEnter={onEnter}
      />
    </>
  );
}
