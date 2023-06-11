import React from "react";

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit, onCloseOverlay}) {
    return (
        <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} onClick={onCloseOverlay}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__submit popup__submit_disabled" type="submit">
                        {buttonText || "Сохранить"}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;