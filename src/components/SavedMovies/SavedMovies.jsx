import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useCallback, useState } from "react";

export default function SavedMovies({ savedMovie, onDelete, setIsError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovie)
  const [foundMovies, setFoundMovies] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [onEnter, setOnEnter] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setFoundMovies(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 30) : searchName
    }))
  }, [])

  function searchMovies(search) {
    setOnEnter(false)
    filter(search, isCheck, savedMovie)
  }

  useEffect(() => {
    if (savedMovie.length === 0) {
      setOnEnter(true)
    } else {
      setOnEnter(false)
    }
    filter(foundMovies, isCheck, savedMovie)
  }, [filter, savedMovie, isCheck, foundMovies])

  function filterShorts() {
    if (isCheck) {
      setIsCheck(false)
      setOnEnter(false)
      filter(foundMovies, false, savedMovie)
    } else {
      setIsCheck(true)
      setOnEnter(false)
      filter(foundMovies, true, savedMovie)
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
        onEnter={onEnter}
        savedMovie={savedMovie}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        onEnter={onEnter}
      />
    </>
  )
}
