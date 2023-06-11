import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function EditProfilePopup({ isOpen, onUpdateUser, onLoading, onClose, onCloseOverlay }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if(currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid) {
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
    }
  }

  return (
    <PopupWithForm
      name="popupEditProfile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_name"
            id="nameInput"
            name="name"
            type="text"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error inputName-error">{errors.name}</span> 
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_more"
            id="inputMore"
            name="about"
            type="text"
            value={values.about || ""}
            onChange={handleChange}
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error inputMore-error">{errors.about}</span> 
        </label>
      </fieldset>
    </PopupWithForm>

  )
}

export default EditProfilePopup;