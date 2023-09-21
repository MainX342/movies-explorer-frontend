import './FilterCheckbox.css'

export default function FilterCheckbox({ isCheck, changeShot }) {
  return (
    <label className='search__label-container'>
      <div className='search__input-container'>
        <input type="checkbox" className='search__ckeck' onChange={changeShot} />
        <svg className='search__check-svg' width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="smalltumb">
            <rect
              className={`search__check-svg-rect${isCheck ? ' search__check-svg-rect_inactive' : ''}`}
              x="1" y="3" width="34" height="14" rx="7" fill="#2BE080"
            />
            <circle
              className={`search__check-svg-circle${isCheck ? ' search__check-svg-circle_inactive' : ''}`}
              cx="28" cy="10" r="5" fill="white"
            />
          </g>
        </svg>
      </div>
      <span className='search__check-text'>Короткометражки</span>
    </label>
  )
}
