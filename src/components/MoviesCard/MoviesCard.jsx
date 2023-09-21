import './MoviesCard.css'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function MoviesCard({ name, src, trailerLink }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  }
  return (
    <li className='gallery__card'>
      <article>
        <div>
        {pathname === '/movies' ?
            <button type='button' className={`gallery__save${click ? ' gallery__save_active' : ''}`} onClick={onClick}></button>
            :
            <button type='button' className={`gallery__save gallery__save_delete`} onClick={onClick}></button>
        }
        <Link to={trailerLink} target='_blank'>
          <img src={src} alt={name} className='gallery__image' />
        </Link>
        </div>
        <div className='gallery__text-group'>
          <h2 className='gallery__subtitle'>{name}</h2>
          <span className='gallery__duration'>1ч 17м</span>
        </div>
      </article>
    </li>
  )
}
