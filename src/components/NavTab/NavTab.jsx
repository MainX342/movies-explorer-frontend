import './NavTab.css'

export default function NavTab({ children }) {
  return (
    <nav>
      <ul className='promo__links-container'>
        {children.map((child, index) => (
          <li className='promo__list' key={index}>{child}</li>
        ))}
      </ul>
    </nav>
  )
}