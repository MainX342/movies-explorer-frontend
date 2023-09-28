import "./Form.css";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import SendContext from "../../contexts/SendContext";
import ErrorContext from "../../contexts/ErrorContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Form({
  name,
  children,
  isValid,
  onSubmit,
  isSuccess,
  setSuccess,
  values,
}) {
  const { pathname } = useLocation();
  const isSending = useContext(SendContext);
  const isError = useContext(ErrorContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (pathname === "/profile") {
      setSuccess(false);
    }
  }, [setSuccess, pathname]);

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === "signin" ? (
        <>
          <span
            className={`login__error-request${
              !isError ? "" : " login__error-request_active"
            }`}
          >
            {"При входите произошла ошибка."}
          </span>
          <button
            type="submit"
            className={`login__submit${
              isValid && !isError ? "" : " login__submit_disabled"
            }`}
            disabled={!isValid || isSending || isError}
          >
            {isSending ? <Preloader name="button" /> : "Войти"}
          </button>
        </>
      ) : name === "signup" ? (
        <>
          <span
            className={`login__error-request login__error-request_type_reg${
              !isError ? "" : " login__error-request_active"
            }`}
          >
            {"При регистрации произошла ошибка."}
          </span>
          <button
            type="submit"
            className={`login__submit${
              isValid && !isError ? "" : " login__submit_disabled"
            }`}
            disabled={!isValid || isSending}
          >
            {isSending ? <Preloader name="button" /> : "Зарегистрироваться"}
          </button>
        </>
      ) : (
        <>
          <span
            className={`profile__message${
              !isError
                ? !isSuccess
                  ? ""
                  : " profile__message_success"
                : " profile__message_active"
            }`}
          >
            {!isError
              ? isSuccess
                ? "Профиль успешно обновлен"
                : ""
              : "При обновлении профиля произошла ошибка."}
          </span>
          <button
            type="submit"
            className={`profile__submit${
              !isValid ||
              (values.username === currentUser.name &&
                values.email === currentUser.email)
                ? " profile__submit_disabled"
                : ""
            }`}
            disabled={
              !isValid ||
              isSending ||
              (values.username === currentUser.name &&
                values.email === currentUser.email)
            }
          >
            {isSending ? <Preloader name="button" /> : "Редактировать"}
          </button>
        </>
      )}
    </form>
  );
}
