import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPageNotFound from '../ErrorPageNotFound/ErrorPageNotFound'
import Profile from '../Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies, savedMovies } from '../../utils/constants'
import { useEffect, useState } from 'react';

export default function Main({ name, setLoggedIn }) {
  const [saveMovie, setSaveMovie] = useState([])
  const [moviesAll, setMoviesAll] = useState([])
  const [isCheckMoviesAll, setIsCheckMoviesAll] = useState(true)
  const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true)

  useEffect(() => {
    setMoviesAll(movies)
    setSaveMovie(savedMovies)
  }, [])

  function onCheckMoviesAll() {
    if (isCheckMoviesAll) {
      setIsCheckMoviesAll(false)

      setMoviesAll(moviesAll.filter((element) => element.duration <= 20))
    } else {
      setIsCheckMoviesAll(true)
      setMoviesAll(movies)
    }
  }

  function onCheckMoviesSave() {
    if (isCheckMoviesSave) {
      setIsCheckMoviesSave(false)
      setSaveMovie(saveMovie.filter((element) => element.duration <= 20))
    } else {
      setIsCheckMoviesSave(true)
      setSaveMovie(savedMovies)
    }
  }

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login name={name} setLoggedIn={setLoggedIn} />,
        signup: <Register name={name} setLoggedIn={setLoggedIn} />,
        pagenotfound: <ErrorPageNotFound />,
        profile: <Profile name={name} setLoggedIn={setLoggedIn} />,
        movies:
          <>
            <SearchForm isCheck={isCheckMoviesAll} changeShot={onCheckMoviesAll} />
            <MoviesCardList movies={moviesAll} />
          </>,
        savedmovies:
          <>
            <SearchForm isCheck={isCheckMoviesSave} changeShot={onCheckMoviesSave} />
            <MoviesCardList movies={saveMovie} />
          </>
      }[name]}
    </main>
  )
}
