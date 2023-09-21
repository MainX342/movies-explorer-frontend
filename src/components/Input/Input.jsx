import './Input.css'

export default function Input({ selectname, name, placeholder, type, title, minLength, value, isInputValid, error, onChange }) {

  return (
    <>
      {selectname !== 'profile' ?
        <label className='login__label'>
          <span className='login__subtitle'>{title}</span>
          <input
            required
            type={type}
            name={name}
            placeholder={placeholder}
            minLength={minLength || ''}
            className={`login__input${isInputValid === undefined || isInputValid ? '' : ' login__input_invaid'}`}
            value={value || ''}
            onChange={onChange}
            autoComplete='on'
          />
        <span className={`login__error${name === 'email' ? ' login__error_wide' : ''}`}>{error}</span>
        </label>
        :
        <>
        <label className='profile__label'>
          <span className='profile__subtitle'>{title}</span>
          <input
            required
            type={type}
            name={name}
            placeholder={placeholder}
            minLength={minLength || ''}
            className={`profile__input${isInputValid === undefined || isInputValid ? '' : ' profile__input_invaid'}`}
            value={value || ''}
            onChange={onChange}
          />
        </label>
        <span className={`profile__error${name === 'email' ? ' profile__error_wide' : ''}`}>{error}</span>
        </>
      }
    </>
  )
}
