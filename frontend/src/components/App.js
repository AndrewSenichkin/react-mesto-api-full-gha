import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';
import PopupConfirmation from './PopupConfirmation';

function App() {
    const [isLoading, setIsLoading] = React.useState(false);//
    const [currentUser, setCurrentUser] = React.useState({});//
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);//
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);//
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);//
    const [selectedCard, setSelectedCard] = React.useState({});//
    const [cards, setCards] = React.useState([]);//
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);//
    const [deletedCard, setDeletedCard] = React.useState({});//
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const history = useHistory();

    const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    //закрытия всех попапов и открытых карточек
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
        setDeletedCard({});
        setInfoToolTipPopupOpen(false);
        setIsConfirmationPopupOpen(false)
    }

    function closeByOverlay(e) {
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    const isOpen =
        isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isConfirmationPopupOpen ||
        selectedCard.link;

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }
        if (isOpen) {
            //только при открытии
            document.addEventListener("keydown", closeByEscape);
            return () => {
                document.removeEventListener("keydown", closeByEscape);
            }
        }
    }, [isOpen])

    function handleUpdateUser(dataUser) {
        setIsLoading(true);
        api
            .editProfileUserInfo(dataUser)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка ${err}`))
            .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(newAvatar) {
        setIsLoading(true);
        api
            .updateProfileUserAvatar(newAvatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => console.log(`Ошибка: ${error}`))
            .finally(() => setIsLoading(false))
    }

    // Сохранение данных при создании карточки
    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api
            .addNewCard(data)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
            .finally(() => setIsLoading(false))
    }

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(user => user === currentUser._id);
        (isLiked ? api.deleteLike(card._id) : api.addLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        setIsLoading(true)
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id))
                closeAllPopups()
            }
            )
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => setIsLoading(false))
    }

    function handleLoginSubmit(email, password) {
        auth
            .login(email, password)
            .then((res) => {
                if(res.token) {
                    setEmail(email);
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", res.token);
                    history.push("/");
                }
            })
            .catch((err) => {
                setInfoToolTipPopupOpen(false);
                setIsSuccess(true);
                 console.log(err);
            })
    }

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setEmail("");
        setIsMobileMenuOpen(false);
        history.push("/sign-in");
        setIsMobileMenuOpen(false);
    }
    function handleClickOpenMobileMenu() {
        if (isLoggedIn) {
            setIsMobileMenuOpen(!isMobileMenuOpen)
        }
    }

    function handleRegisterSubmit(email, password) {
        auth
            .register(email, password)
            .then((res) => {
                if(res) {
                    setInfoToolTipPopupOpen(true);
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                console.log(err);
                setInfoToolTipPopupOpen(false);
                setIsSuccess(false);
            })
            .finally(() => setIsSuccess(true));
    }

    React.useEffect(() => {
        isLoggedIn &&
          Promise.all([api.getAboutUserInfo(), api.getInitialCards()])
            .then(([profileInfo, cards]) => {
              setCurrentUser(profileInfo)
              setCards(cards.data.reverse())
            })
            .catch((error) => console.log(`Ошибка: ${error}`))
      }, [isLoggedIn]);

      // исчрпывающий
    /*React.useEffect(() => {
        tokenCheck();
      });
    function tokenCheck() {
        if(localStorage.getItem("jwt")) {
            const jwt = localStorage.getItem("jwt");
            if(jwt) {
                auth
                .checkToken(jwt)
                .then((res) => {
                    if(res) {
                        setIsLoggedIn(true);
                        setEmail(res.email);
                        history.push("/");
                    }
                })
                .catch((err) => {
                    if(err.status === 401) {
                        console.log("401 — Токен не передан или передан не в том формате")
                    }
                    console.log("401 — Переданный токен некорректен")
                })
            }
        }
    }*/
    React.useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
          auth
            .checkToken(jwt)
            .then((res) => {
              setIsLoggedIn(true)
              setEmail(res.email)
              history.push("/")
            })
            .catch((err) => {
              if (err.status === 401) {
                console.log("401 — Токен не передан или передан не в том формате")
              }
              console.log("401 — Переданный токен некорректен")
            })
        }
      }, [history])

    return (
        <CurrentUserContext.Provider value={currentUser} >
            <div className="root">
                <div className="page">
                    <Header
                        email={email}
                        onSignOut={handleSignOut}
                        isMobileMenuOpen={isMobileMenuOpen}
                        handleClickOpenMobileMenu={handleClickOpenMobileMenu}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            isLoggedIn={isLoggedIn}
                            onEditAvatar={setEditAvatarPopupOpen}
                            onEditProfile={setEditProfilePopupOpen}
                            onConfirmationPopup={setIsConfirmationPopupOpen}
                            onAddPlace={setAddPlacePopupOpen}
                            onCardClick={setSelectedCard}
                            onCardLike={handleCardLike}
                            onDeletedCard={setDeletedCard}
                            cards={cards}
                            component={Main}
                        />
                        <Route path="/sign-in">
                            <Login onLogin={handleLoginSubmit} />
                        </Route>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegisterSubmit} />
                        </Route>
                        <Route>
                            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                    </Switch>
                    {isLoggedIn && <Footer />}
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                        onLoading={isLoading}
                        onClose={closeAllPopups}
                        onCloseOverlay={closeByOverlay}
                    />
                    <EditAvatarPopup
                        onUpdateAvatar={handleUpdateAvatar}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onLoading={isLoading}
                        onCloseOverlay={closeByOverlay}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        onLoading={isLoading}
                        onCloseOverlay={closeByOverlay}
                    />
                    <PopupConfirmation
                        onClose={closeAllPopups}
                        isOpen={isConfirmationPopupOpen}
                        onCardDelete={handleCardDelete}
                        onLoading={isLoading}
                        card={deletedCard}
                        onCloseOverlay={closeByOverlay}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        onCloseOverlay={closeByOverlay}
                    />
                    <InfoToolTip
                        isOpen={isInfoToolTipPopupOpen}
                        onClose={closeAllPopups}
                        isSuccess={isSuccess}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
