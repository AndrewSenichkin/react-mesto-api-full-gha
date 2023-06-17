import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = props.card.owner === currentUser._id;
    //const deleteButtonClassName = `element__trash ${isOwner ? "element__trash_active" : ""}`
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(id => id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__smile ${isLiked ? 'element__smile_active' : ""}`;

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
        props.onConfirmationPopup(true);
    }

    return (
        <article className="element">
            {isOwner && (
                <button
                    className="element__trash"
                    aria-label="Удалить"
                    onClick={handleDeleteClick}
                    type="button"
                />
            )}
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__container-like">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__count-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}
export default Card;