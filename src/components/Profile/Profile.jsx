import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Profile.css'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import { useEffect } from 'react'

export default function Profile({ name, setLoggedIn }) {
  const { values, errors, isInputValid, isValid, handleChange, resetForm } = useFormValidation()

  useEffect(() => {
    resetForm({username: 'Виталий', email: 'pochta@yandex.ru'})
  }, [resetForm])

  function onSubmit(evt) {
    evt.preventDefault()
  }

  function outLogin() {
    setLoggedIn(false)
  }
  return (
    <section className="profile page__profile">
      <h1 className = 'profile__title'>{`Привет, Виталий!`}</h1>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
      >
        <Input
          selectname={name}
          name = 'username'
          type = 'text'
          title = 'Имя'
          placeholder = 'Введите имя'
          minLength = '3'
          maxLength = '20'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Input
          selectname={name}
          name = 'email'
          type = 'email'
          title = 'E-mail'
          placeholder = 'Введите e-mail'
          minLength = '3'
          maxLength = '30'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
        />
      </Form>
      <Link to={'/'} onClick={outLogin} className = 'profile__link'>Выйти из аккаунта</Link>
    </section>
  )
}
