import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ErrorPageNotFound from '../ErrorPageNotFound/ErrorPageNotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';

export default function Main({ name, onRegister, onLogin, onLogOut, updateUser, setIsError, savedMovies, onDelete, addMovie, isSuccess, setSuccess, isEdit, setIsEdit }) {

  return (
    <main className="main">
      {name === "home" && <>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </>}
      {name === "signin" && <Login name={name} onLogin={onLogin} setIsError={setIsError} />}
      {name === "signup" && <Register name={name} onRegister={onRegister} setIsError={setIsError} />}
      {name === "error" && <ErrorPageNotFound />}
      {name === "profile" && <Profile name={name} onLogOut={onLogOut} updateUser={updateUser} setIsError={setIsError} isSuccess={isSuccess} setSuccess={setSuccess} setIsEdit={setIsEdit} isEdit={isEdit} />}
      {name === "movies" && <Movies savedMovies={savedMovies} addMovie={addMovie} setIsError={setIsError} />}
      {name === "savedmovies" && <SavedMovies savedMovie={savedMovies} onDelete={onDelete} setIsError={setIsError} />}
    </main>
  );
}