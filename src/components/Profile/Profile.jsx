import "./Profile.css";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SendContext from "../../contexts/SendContext";
import { EmailRegex } from "../../utils/constants";

export default function Profile({
  name,
  onLogOut,
  updateUser,
  setIsError,
  isSuccess,
  setSuccess,
  isEdit,
  setIsEdit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isSending = useContext(SendContext);
  const { values, errors, isInputValid, isValid, handleChange, resetForm } =
    useFormValidation();

  useEffect(() => {
    resetForm({ username: currentUser.name, email: currentUser.email });
  }, [resetForm, currentUser, isEdit]);

  function onSubmit(evt) {
    evt.preventDefault();
    updateUser(values.username, values.email);
  }

  return (
    <section className="profile page__profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsError={setIsError}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      >
        <Input
          selectname={name}
          name="username"
          type="text"
          title="Имя"
          placeholder="Введите имя"
          minLength="2"
          maxLength="30"
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={(evt) => {
            handleChange(evt);
            setIsError(false);
          }}
          isEdit={isEdit}
        />
        <Input
          selectname={name}
          name="email"
          type="email"
          title="E-mail"
          placeholder="Введите e-mail"
          minLength="3"
          maxLength="30"
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={(evt) => {
            handleChange(evt);
            setIsError(false);
          }}
          isEdit={isEdit}
          pattern={EmailRegex}
        />
      </Form>
      <Link
        to={"/"}
        onClick={onLogOut}
        className={`profile__link${isSending ? " profile__link_disabled" : ""}`}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}
