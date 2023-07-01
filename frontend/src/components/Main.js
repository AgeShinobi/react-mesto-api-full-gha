import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      {/* Секция профиля  */}
      <section className="profile content__profile">
        <div className="profile__wrapper">
          {/* круглая аватарка  */}
          <button onClick={props.onEditAvatar} type="button" className="profile__avatar-button" aria-label="Сменить аватар">
            <img src={currentUser.avatar} alt="Ваш аватар" className="profile__avatar" />
          </button>
          {/* инфо. Выстраивает элементы в колонку  */}
          <div className="profile__info">
            {/* Здесь выравнивает имя и кнопку в одну строку  */}
            <div className="profile__main-info">
              <h1 className="profile__my-name">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__edit-btn" aria-label="Редактировать профиль" />
            </div>
            <h2 className="profile__about-me">{currentUser.about}</h2>
          </div>
        </div>
        {/* Кнопка "Добавить"  */}
        <button onClick={props.onAddPlace} type="button" className="profile__add-btn" aria-label="Добавить" />
      </section>
      {/* Секция с постами  */}
      <section className="cards content__cards">
        {props.cards.map((card) => {
          return (
            <Card 
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        })} 
      </section>
    </main>
  )

}

export default Main