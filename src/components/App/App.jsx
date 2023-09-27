import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import {
  registration,
  authorization,
  getUserData,
  updateUserInfo,
  getMovies,
  addMovie,
  deleteMovie,
} from "../../utils/MainApi";
import SendContext from "../../contexts/SendContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ErrorContext from "../../contexts/ErrorContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedPages from "../ProtectedPages/ProtectedPages";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([getUserData(localStorage.jwt), getMovies(localStorage.jwt)])
        .then(([user, movies]) => {
          setSavedMovies(movies.reverse());
          setCurrentUser(user);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`);
          setIsCheckToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  const setSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== movieId));
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`));
  }

  function handleToggleMovie(data) {
    const isAdd = savedMovies.some((element) => data.id === element.movieId);
    const searchClickMovie = savedMovies.filter((movie) => movie.movieId === data.id);

    if (isAdd) {
      handleDeleteMovie(searchClickMovie[0]._id);
    } else {
      addMovie(data, localStorage.jwt)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  function handleLogin(email, password) {
    setIsSend(true);
    authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при авторизации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleRegister(username, email, password) {
    setIsSend(true);
    registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          authorization(email, password)
            .then((res) => {
              localStorage.setItem("jwt", res.token);
              setLoggedIn(true);
              navigate("/movies");
              window.scrollTo(0, 0);
            })
            .catch((err) => {
              setIsError(true);
              console.error(`Ошибка при авторизации после регистрации ${err}`);
            })
            .finally(() => setIsSend(false));
        }
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function onLogOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  function updateUser(username, email) {
    setIsSend(true);
    updateUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        setIsEdit(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при редактировании данных ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  return (
    <div className="page__container">
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>
                <Route
                  path="/signin"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signin"
                        onLogin={handleLogin}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/signup"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signup"
                        onRegister={handleRegister}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={ProtectedPages}
                      name="profile"
                      loggedIn={loggedIn}
                      onLogOut={onLogOut}
                      updateUser={updateUser}
                      setIsError={setIsError}
                      isSuccess={isSuccess}
                      setSuccess={setSuccess}
                      setIsEdit={setIsEdit}
                      isEdit={isEdit}
                    />
                  }
                />

                <Route
                  path="/"
                  element={
                    <>
                      <Header name="home" loggedIn={loggedIn} />
                      <Main name="home" />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedPages}
                      name="movies"
                      savedMovies={savedMovies}
                      addMovie={handleToggleMovie}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedPages}
                      name="savedmovies"
                      onDelete={handleDeleteMovie}
                      savedMovies={savedMovies}
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                    />
                  }
                />

                <Route
                  path="*"
                  element={
                    <>
                      <Main name="error" />
                    </>
                  }
                />
              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
