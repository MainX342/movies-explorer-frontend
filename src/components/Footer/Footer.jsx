import './Footer.css'
import { Link } from 'react-router-dom'


export default function Footer() {

  return (
    <footer className="footer page__footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__subtitle">© 2023</p>
        <nav className="footer__nav">
          <Link to={'https://practicum.yandex.ru/'} target='_blank' className="footer__link">Яндекс.Практикум</Link>
          <Link to={'https://github.com/MainX342'} target='_blank' className="footer__link">Github</Link>
        </nav>
      </div>
    </footer>
  )
}