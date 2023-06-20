import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen, onCloseOverlay }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    React.useEffect(() => {
        resetForm()
    }, [isOpen, resetForm])

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onAddPlace({
                name: values.name,
                link: values.link,
            });
        }
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="cards"
            buttonText={onLoading ? "Сохранение" : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}
        >
            <fieldset className="popup__fieldset">
                <label className="popup__label">
                    <input className="popup__input popup__input_card-name"
                        id="inputCardName"
                        name="name"
                        type="text"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        value={values.name || ''}
                        onChange={handleChange}
                        required
                    />
                    <span className="popup__input-error inputCardName-error">{errors.name}</span>
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_card-url"
                        id="inputCardUrl"
                        name="link"
                        type="url"
                        value={values.link || ''}
                        onChange={handleChange}
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error inputCardUrl-error">{errors.link}</span>
                </label>
            </fieldset>
        </PopupWithForm>);
}

export default AddPlacePopup;