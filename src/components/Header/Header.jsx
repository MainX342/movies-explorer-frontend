import React, { useCallback, useEffect, useState } from 'react';
import './Header.css'
import { Link, useLocation } from "react-router-dom";


export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation()
  const [burger, setBurger] = useState(false);

  const closeBurgerOnWidth = useCallback(() => {
    if (document.documentElement.clientWidth > "680") {
      setBurger(false);
    }
  }, []);

  useEffect(() => {
    if (!burger) return;
    window.addEventListener("resize", closeBurgerOnWidth);

    return () => {
      window.removeEventListener("resize", closeBurgerOnWidth);
    };
  }, [burger, closeBurgerOnWidth]);

  function handelClick() {
    if (burger) {
      setBurger(false);
    } else {
      setBurger(true);
    }
  }

  return (
    <header className={`header${name === 'home' ? ' header_unauthorized' : ' header_authorized'}`}>
      <div>
        <Link to={'/'} className="header__logo"></Link>
      </div>
      {name === 'home' && !loggedIn ?
      <>
        <nav>
          <ul className='header__links-container'>
          <li className='header__item'>
              <Link to={'/signup'} className="header__signup">Регистрация</Link>
            </li>
            <li className='header__item'>
              <Link to={'/signin'} className="header__signin">Войти</Link>
            </li>
          </ul>
        </nav>
        </>
        :
        <>
          <nav className={`header__nav${burger ? ' header__nav_visible' : ''}`}>
            <ul className='header__links-container header__burger-container'>
              <li className='header__link-container'>
                <Link
                  to={'/'}
                  className={`header__link${pathname === '/' ? ' header__link_active' : ''}`}
                  onClick={handelClick}
                >Главная</Link>
              </li>
              <li className='header__link-container'>
                <Link
                  to={'/movies'}
                  className={`header__link${pathname === '/movies' ? ' header__link_active' : ''}`}
                  onClick={handelClick}
                >Фильмы</Link>
              </li>
              <li className='header__link-container'>
                <Link
                  to={'/saved-movies'}
                  className={`header__link${pathname === '/saved-movies' ? ' header__link_active' : ''}`}
                  onClick={handelClick}
                >Сохранённые фильмы</Link>
              </li>
              <li className='header__link-container'>
                <Link
                  to={'/profile'}
                  className={`header__logo-account${pathname === '/profile' ? ' header__link_active' : ''}`}
                  onClick={handelClick}
                ></Link>
              </li>
            </ul>
            <button type='button' className='header__burger-close' onClick={handelClick}></button>
          </nav>
          <button type='button' className='header__burger' onClick={handelClick}></button>
        </>
      }
    </header>
  )
}