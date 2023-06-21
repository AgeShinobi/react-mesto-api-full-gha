import React from "react"
import { Link } from "react-router-dom"
import headerLogo from '../images/logo-white.svg'

function Header( {isLoggedIn, ...props} ) {
  if (isLoggedIn) {
    return (
      <header className="header page__header">
        <img src={headerLogo} alt="Место" className="header__logo" />
        <div className="header__wrapper">
          <p className="header__email">{props.email}</p>
          <button type="button" className="header__link header__logout-button" onClick={props.onLogout}>Выйти</button>
        </div>

      </header>
    )
  } else {
    return (
      <header className="header page__header">
        <img src={headerLogo} alt="Место" className="header__logo" />
        <Link to={props.linkPath} className="header__link">{props.linkText}</Link>
  
      </header>
    )
  }
}

export default Header
