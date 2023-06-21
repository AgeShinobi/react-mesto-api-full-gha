import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  //подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);


  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >

      <input
        value={name} onChange={handleChangeName}
        name="name" id="name-input"
        className="popup__input" type="text"
        minLength="2" maxLength='40'
        placeholder="Ваше имя" required
      />
      <span className="popup__input-error name-input-error" />

      <input
        value={description} onChange={handleChangeDescription}
        name="about" id="job-input"
        className="popup__input" type="text"
        minLength="2" maxLength="200"
        placeholder="Кем вы работаете?" required
      />
      <span className="popup__input-error job-input-error" />

    </PopupWithForm>
  )
}

export default EditProfilePopup