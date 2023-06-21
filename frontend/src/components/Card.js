import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}` 
  );; 
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
      <article className="card">
        <img onClick={handleClick} className="card__image" src={props.card.link} alt={props.card.name} />
        {isOwn && <button type="button" onClick={handleCardDelete} className="card__trash-btn" aria-label="Удалить" />}
        <div className="card__wrapper">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-wrapper">
            <button type="button" onClick={handleCardLike} className={cardLikeButtonClassName} aria-label="Нравится" />
            <span className="card__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </article>
  )
}

export default Card