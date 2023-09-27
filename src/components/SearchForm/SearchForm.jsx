import "./SearchForm.css";
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import ErrorContext from "../../contexts/ErrorContext";

export default function SearchForm({
  isCheck,
  filterShorts,
  foundMovies,
  searchMovies,
  setIsError,
  isLoading,
  savedMovie,
}) {
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext);
  const { values, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovie.length === 0) {
      resetForm({ search: "" });
    } else {
      resetForm({ search: foundMovies });
    }
    setIsError(false);
  }, [foundMovies, resetForm, setIsError, pathname, savedMovie]);

  function onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  return (
    <section className="search page__search">
      <div className="search__container">
        <form
          noValidate
          className="search__form"
          name={"SearchForm"}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="search"
            placeholder="Фильм"
            className="search__input"
            value={values.search || ""}
            onChange={(evt) => {
              handleChange(evt);
              setIsError(false);
            }}
            disabled={
              (pathname === "/saved-movies" && savedMovie.length === 0) ||
              (pathname === "/movies" && isLoading)
                ? true
                : false
            }
            required
          />
          <button
            type="submit"
            className={`search__submit${
              (pathname === "/saved-movies" && savedMovie.length === 0) ||
              (pathname === "/movies" && isLoading)
                ? " search__submit_disabled"
                : ""
            }`}
          ></button>
        </form>
        <span className={`search__error ${isError && "search__error_active"}`}>
          {"Введите ключевое слово"}
        </span>
        <FilterCheckbox
          isCheck={isCheck}
          filterShorts={filterShorts}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
