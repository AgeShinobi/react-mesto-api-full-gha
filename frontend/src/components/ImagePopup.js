

function ImagePopup({ card, onClose }) {
  return (
    <section
      id="popup-image"
      className={`popup popup_image ${card.link !== '' ? "popup_opened" : ""}`}
    >
      <figure className="popup__image-wrapper">
        <button onClick={onClose} type="button" className="popup__close" />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup