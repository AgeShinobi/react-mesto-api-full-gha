import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name, 
      link: link
    })
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      name='add'
      title='новое место'
      buttonText='Добавить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <label className="popup__label">
        <input
          value={name}
          onChange={handleNameChange}
          name="name" id="title-input"
          className="popup__input" minLength="2"
          maxLength="40" type="text"
          placeholder="Название"
          required
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          value={link}
          onChange={handleLinkChange}
          name="link" id="link-input"
          className="popup__input" type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error link-input-error"></span>
      </label>

    </PopupWithForm>
  )
}

export default AddPlacePopup