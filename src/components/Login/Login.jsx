import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from "../../hooks/useFormValidation";
import { EmailRegex } from "../../utils/constants";

export default function Login({ name, onLogin, setIsError }) {
  const { values, errors, isInputValid, isValid, handleChange } =
    useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <SectionLogin
      name={name}
      isValid={isValid}
      setIsError={setIsError}
      onSubmit={onSubmit}
    >
      <Input
        name="email"
        type="email"
        title="E-mail"
        placeholder="Электронная почта"
        minLength="3"
        maxLength="30"
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
        pattern={EmailRegex}
      />
      <Input
        name="password"
        type="password"
        title="Пароль"
        placeholder="Пароль"
        minLength="3"
        maxLength="30"
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
      />
    </SectionLogin>
  );
}
