import "./Input.css";
import { useContext } from "react";
import SendContext from "../../contexts/SendContext";

export default function Input({
  selectname,
  name,
  placeholder,
  type,
  title,
  minLength,
  maxLength,
  value,
  isInputValid,
  error,
  onChange,
  pattern,
}) {
  const isSending = useContext(SendContext);

  return (
    <>
      {selectname !== "profile" ? (
        <label className="login__label">
          <span className="login__subtitle">{title}</span>
          <input
            required
            type={type}
            name={name}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            className={`login__input${
              isInputValid === undefined || isInputValid
                ? ""
                : " login__input_invaid"
            }`}
            value={value || ""}
            onChange={onChange}
            autoComplete="on"
            disabled={isSending}
            pattern={pattern}
          />
          <span
            className={`login__error${
              name === "email" ? " login__error_wide" : ""
            }`}
          >
            {error}
          </span>
        </label>
      ) : (
        <>
          <label className="profile__label">
            <span className="profile__subtitle">{title}</span>
            <input
              required
              type={type}
              name={name}
              placeholder={placeholder}
              minLength={minLength}
              maxLength={maxLength}
              className={`profile__input${
                isInputValid === undefined || isInputValid
                  ? ""
                  : " profile__input_invaid"
              }`}
              value={value || ""}
              onChange={onChange}
              disabled={isSending}
              pattern={pattern}
            />
          </label>
          <span
            className={`profile__error${
              name === "email" ? " profile__error_wide" : ""
            }`}
          >
            {error}
          </span>
        </>
      )}
    </>
  );
}
