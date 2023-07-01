import React, { useEffect, useState, useCallback } from 'react';

import successIcon from "../images/success-icon.svg"
import errorIcon from "../images/error-icon.svg"

import '../index.css';
import api from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import InfoToolTip from './InfoToolTip';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';

import Register from './Register';
import Login from './Login';
//конктест currentUser
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as auth from '../auth';
import ProtectedRoute from './ProtectedRoute';

const INITIAL_USER = {};
const JWT_KEY = 'jwt';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //нужен для отображения лоадера вместо /sign-up во время получения токена
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [email, setEmail] = useState('');
  const [isSuccessInfoPopupOpen, setIsSuccessInfoPopupOpen] = useState(false);
  const [isFailInfoPopupOpen, setIsFailInfoPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  //общий функционал колбеков вынесен в cbAuth
  const cbAuth = (data) => {
    if (!data || data.error || data.message) {
      cbFailInfoPopup();
      throw new Error('Ошибка аутентификации');
    }
    if (data.token) {
      localStorage.setItem(JWT_KEY, data.token);
      setLoggedIn(true);
      navigate("/", { replace: true })
    }
  }
  const cbLogin = async ({ email, password }) => {
    try {
      const data = await auth.authorize(email, password);
      cbAuth(data);
    } catch (err) {
      
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  const cbRegister = async ({ email, password }) => {
    try {
      const data = await auth.register(email, password);
      cbAuth(data);
      navigate("/sign-in", { replace: true });
    } catch (err) {
      cbFailInfoPopup();
      console.error(err);
    } finally {
      setLoading(false);
      cbSuccessInfoPopup();
    }
  }
  const cbTokenCheck = useCallback(async () => {
    try {
      const jwt = localStorage.getItem(JWT_KEY);
      if (!jwt) {
        throw new Error('no token');
      }
      //ответом api является данные пользователя
      const user = await auth.checkToken(jwt);
      if (!user) {
        throw new Error('no user');
      }
      setLoggedIn(true);
      setEmail(user.email);
      setCurrentUser(user);
      navigate("/", { replace: true })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoggedIn, setEmail, setCurrentUser, navigate]);

  const cbLogout = () => {
    localStorage.removeItem(JWT_KEY);
    setLoggedIn(false);
    setCurrentUser(INITIAL_USER);
    navigate("/sign-in", { replace: true });
  }

  //popupInfo (InfoToolTip) success & fail
  function cbSuccessInfoPopup() {
    setIsSuccessInfoPopupOpen(true);
  }
  function cbFailInfoPopup() {
    setIsFailInfoPopupOpen(true);
  }
  // ф-ции висят на onClick в Main и меняют состояние в PopupWithForm
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //функция открытия картинки
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }
  //функция лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (isLiked ? api.removeLike(card._id) : api.like(card._id))
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => { console.log(err) });
  }
  //удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c))
      })
      .catch((err) => { console.log(err) });
  }
  //добавление картинки
  function handleAddPlace(values) {
    api.createCard(values)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }
  //обновление информации пользователя
  function handleUpdateUser(data) {
    api.profileEdit(data)
      .then((newData) => {
        setCurrentUser(newData.user);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }
  //обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((newData) => {
        setCurrentUser(newData.user);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
  }

  function closeAllPopups() {
    setIsSuccessInfoPopupOpen(false);
    setIsFailInfoPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  const ProtectedMain = () => {
    return (
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    );
  };

  useEffect(() => {
    cbTokenCheck();
  }, [cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards.data);
        })
        .catch((err) => { console.log(err) });
    }
  }, [loggedIn])

  if (loading) {
    return "Loading..."
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          {loggedIn && <Header isLoggedIn={loggedIn} onLogout={cbLogout} email={email} />}
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute element={ProtectedMain} loggedIn={loggedIn} />
              }
            ></Route>
            <Route
              path='/sign-up'
              element={
                <>
                  <Header isLoggedIn={loggedIn} linkPath="/sign-in" linkText="Войти" />
                  <Register isLoggedIn={loggedIn} onRegister={cbRegister} />
                </>
              }
            ></Route>
            <Route
              path='sign-in'
              element={
                <>
                  <Header isLoggedIn={loggedIn} linkPath="/sign-up" linkText="Зарегистрироваться" />
                  <Login isLoggedIn={loggedIn} onLogin={cbLogin} />
                </>
              }
            ></Route>
          </Routes>
          {loggedIn && <Footer />}

          <InfoToolTip 
            isOpen={isSuccessInfoPopupOpen}
            onClose={closeAllPopups}
            text='Вы успешно зарегистрировались!'
            icon={successIcon}
          />
          <InfoToolTip 
            isOpen={isFailInfoPopupOpen}
            onClose={closeAllPopups}
            text='Что-то пошло не так!
            Попробуйте ещё раз.'
            icon={errorIcon}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>


        {/* popupWithConfirm. TODO */}
        {/* <section id="popup-delete-card" className="popup">
          <div className="popup__container popup__container_confirm">
            <button type="button" className="popup__close" />
            <h2 className="popup__title popup__title_confirm">Вы уверены?</h2>
            <form name="deleteForm" className="form">
              <button className="popup__submit" type="submit">Да</button>
            </form>
          </div>
        </section> */}


      </div>
    </div>
  );
}

export default App;
