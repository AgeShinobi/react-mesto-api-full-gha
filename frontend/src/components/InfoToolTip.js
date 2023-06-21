import React from "react"

function InfoToolTip({ isOpen, onClose, text, icon }) {
  return (
    <section
      id={`popup-info`}
      className={isOpen ? "popup popup_opened" : "popup"}
    >
      <div className="popup__container popup__container_info">
        <button onClick={onClose} type="button" className="popup__close" />
        <img src={icon} alt={text} className="popup__icon-info"/>
        <p className="popup__text-info">{text}</p>
      </div>
    </section>
  )
}

export default InfoToolTip
