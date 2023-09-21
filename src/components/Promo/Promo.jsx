import './Promo.css'
import { HashLink } from 'react-router-hash-link'
import NavTab from "../NavTab/NavTab"

export default function Promo() {

  return (
    <section className="promo page__promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <NavTab>
        <HashLink smooth to='#aboutProject' className="promo__link">О проекте</HashLink>
        <HashLink smooth to='#techs' className="promo__link">Технологии</HashLink>
        <HashLink smooth to='#aboutMe' className="promo__link">Студент</HashLink>
      </NavTab>
      </div>
    </section>
  )
}
