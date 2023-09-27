import { Link } from 'react-router-dom'
import './Portfolio.css'
import WrapperNarrow from '../WrapperNarrow/WrapperNarrow'

export default function Portfolio() {
  return (
    <section className='portfolio page__portfolio'>
      <WrapperNarrow>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className="portfolio__nav">
          <ul className='portfolio__list'>
            <li className='portfolio__item'>
              <Link to={'https://mainx342.github.io/how-to-learn/'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Статичный сайт</p>
                <div className='portfolio__button'></div>
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link to={'https://mainx342.github.io/russian-travel/'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Адаптивный сайт</p>
                <div className='portfolio__button'></div>
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link to={'https://mainx342.github.io/react-mesto-auth/'} target='_blank' className='portfolio__link portfolio__link_type_last'>
                <p className='portfolio__subtitle'>Одностраничное приложение</p>
                <div className='portfolio__button'></div>
              </Link>
            </li>
          </ul>
        </nav>
      </WrapperNarrow>
    </section>
  )
}