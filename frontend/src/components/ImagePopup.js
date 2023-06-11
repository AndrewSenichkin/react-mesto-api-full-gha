import React from 'react';

function ImagePopup({card, onClose, onCloseOverlay}) {
    return (
    <div className={`popup popup_image ${card.link ? "popup_opened" : ""}`}
    onClick={onCloseOverlay}
    >
        <figure className="popup__container-image">
            <img className="popup__image" src={card.link} alt={card.name}/>
            <figcaption className="popup__title-image">{card.name}</figcaption>
            <button className="popup__close-icon" type="button" onClick={onClose}></button>
        </figure>
    </div>
      )
}
export default ImagePopup;