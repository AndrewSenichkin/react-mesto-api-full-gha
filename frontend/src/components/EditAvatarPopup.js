import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onLoading, onUpdateAvatar, onCloseOverlay }) {
    const refAvatar = React.useRef(null);

    React.useEffect(() => {
        refAvatar.current.value = "";
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: refAvatar.current.value,
        })
    }
    function handleChangeAvatar() {
        return refAvatar.current.value;
      }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="update-avatar"
            buttonText={onLoading ? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}
        >
            <fieldset className="popup__fieldset">
                <label className="popup__label">
                    <input className="popup__input popup__input_type_link-avatar"
                        id="nameAvatarInput"
                        name="avatar"
                        type="url"
                        placeholder="Введите URL"
                        ref={refAvatar}
                        onChange={handleChangeAvatar}
                        required />
                    <span className="popup__input-error nameAvatarInput-error"/>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;