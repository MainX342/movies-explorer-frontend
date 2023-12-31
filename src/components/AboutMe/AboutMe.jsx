import { Link } from "react-router-dom"
import './AboutMe.css'
import photo from '../../images/photo.png'
import WrapperNarrow from "../WrapperNarrow/WrapperNarrow"

export default function AboutMe() {
  return (
    <section id={"aboutMe"} className="aboutme page__aboutme">
      <WrapperNarrow>
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__container">
          <div className="aboutme__text-container">
            <h3 className="aboutme__name">Виталий</h3>
            <p className="aboutme__job">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutme__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
              закончил факультет экономики СГУ. У&nbsp;меня есть жена
              и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
              Недавно начал кодить. С 2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке,
              начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
            <Link to={'https://github.com/MainX342'} target='_blank' className="aboutme__link">Github</Link>
          </div>
          <img src={photo} alt="Моя фотография" className="aboutme__image" />
        </div>
      </WrapperNarrow>
    </section>
  )
}
