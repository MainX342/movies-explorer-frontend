import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import {
  MediumScreen,
  SmallScreen,
  InitLargeScreen,
  InitMediumScreen,
  InitSmallScreen,
  StepLargeScreen,
  StepSmallScreen,
} from "../../utils/constants";

export default function MoviesCardList({
  movies,
  onDelete,
  addMovie,
  savedMovies,
  isLoading,
  serverError,
  onEnter,
}) {
  const { pathname } = useLocation();
  const [visibleMovies, setVisibleMovies] = useState("");
  const count = movies.slice(0, visibleMovies);

  function showMovies() {
    const counter = { init: InitLargeScreen, step: StepLargeScreen };
    if (window.innerWidth <= MediumScreen) {
      counter.init = InitMediumScreen;
      counter.step = StepSmallScreen;
    }
    if (window.innerWidth <= SmallScreen) {
      counter.init = InitSmallScreen;
      counter.step = StepSmallScreen;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === "/movies") {
      setVisibleMovies(showMovies().init);
      function showMoviesForResize() {
        setTimeout(() => {
          if (window.innerWidth > MediumScreen) {
            setVisibleMovies(showMovies().init);
          }
          if (window.innerWidth <= MediumScreen) {
            setVisibleMovies(showMovies().init);
          }
          if (window.innerWidth <= SmallScreen) {
            setVisibleMovies(showMovies().init);
          }
        }, 500);
      }
      window.addEventListener("resize", showMoviesForResize);
      return () => window.removeEventListener("resize", showMoviesForResize);
    }
  }, [pathname, movies]);

  function clickMore() {
    setVisibleMovies(visibleMovies + showMovies().step);
  }

  return (
    <section className="gallery page__gallery">
      <ul className="gallery__lists">
        {isLoading ? (
          <Preloader />
        ) : pathname === "/movies" && count.length !== 0 ? (
          count.map((data) => {
            return (
              <MoviesCard
                key={data.id}
                savedMovies={savedMovies}
                addMovie={addMovie}
                data={data}
              />
            );
          })
        ) : movies.length !== 0 ? (
          movies.map((data) => {
            return (
              <MoviesCard key={data._id} onDelete={onDelete} data={data} />
            );
          })
        ) : serverError ? (
          <span className="gallery__serch-error">
            «Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз»
          </span>
        ) : !onEnter ? (
          <span className="gallery__serch-error">«Ничего не найдено»</span>
        ) : pathname === "/movies" ? (
          <span className="gallery__serch-error">
            «Воспользуйтесь поиском, чтобы найти подходящие фильмы»
          </span>
        ) : (
          <span className="gallery__serch-error">
            «Нет сохранённых фильмов»
          </span>
        )}
      </ul>
      {pathname === "/movies" && (
        <button
          type="button"
          className={`gallery__more ${
            visibleMovies >= movies.length ? "gallery__more_hidden" : ""
          }`}
          onClick={clickMore}
        >
          Ёще
        </button>
      )}
    </section>
  );
}
