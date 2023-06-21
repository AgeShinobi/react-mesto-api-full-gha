import React from "react"

function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {
  return (
    <section
      id={`popup-${name}`}
      className={isOpen ? "popup popup_opened" : "popup" }
    >
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close" />
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}Form`} className="form" onSubmit={onSubmit}>
          {children}
          <button className="popup__submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm