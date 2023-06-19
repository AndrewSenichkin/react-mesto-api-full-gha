import React from 'react';
import profilePen from '../image/VectorPen.svg';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';
import Loader from  './Loader';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (  
        <main className="content">
            {props.isLoading && <Loader />}
            <section className={`profile ${props.isLoading && "page__profile_hidden"}`}>
                <div className="profile__container">
                    <div className="profile__wrapper">
                        <img className="profile__avatar" src={currentUser.avatar} alt={`Изображение профиля, ${currentUser.name}`} />
                        <button className="profile__edit-avatar" type="button" onClick={() => props.onEditAvatar(true)}>
                            <img className="profile__edit-pen" src={profilePen} alt="Письменная ручка" />
                        </button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container-title">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={() => props.onEditProfile(true)} type="button"></button>
                        </div>
                        <p className="profile__more">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={() => props.onAddPlace(true)} type="button"></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onDeletedCard}
                        onConfirmationPopup={props.onConfirmationPopup}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;