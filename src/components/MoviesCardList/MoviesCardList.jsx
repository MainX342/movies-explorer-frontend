import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'

export default function MoviesCardList({ movies }) {
  const [count, setCount] = useState(showCards().init)
  const fact = movies.slice(0, count)

  function showCards() {
    const counter = { init: 12, step: 3}
    if (window.innerWidth < 1023) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth < 450) {
      counter.init = 5
      counter.step = 1
    }
    return counter
  }

  function clickMore() {
    setCount(count + showCards().step)
  }

  return (
    <section className='gallery page__gallery'>
      <ul className='gallery__lists'>
        {fact.map(data => {
          return (
            <MoviesCard key={data.id} name={data.name} src={data.image} duration={data.duration} trailerLink={data.trailerLink}/>
          )
        })}
      </ul>
      <button type='button' className={`gallery__more${count >= movies.length ? ' gallery__more_hidden' : ''}`} onClick={clickMore}>Ёще</button>
    </section>
  )
}
