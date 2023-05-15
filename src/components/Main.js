import React from "react";
import PopupWithForm from "./PopupWithForm";
import PopupFullscreen from "./PopupFullscreen";
import api  from "../utils/Api";
import Card  from "./Card";



function Main (props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    api.takeProfileInfoRequest()
        .then((userData) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        });
    
    api.takeCardsRequset()
        .then((cardList) => {
            setCards(cardList);            
        }) 
  }, [])

  

  return (
    <main className="main">
        <section className="profile">
            <button className="profile__avatar-container" onClick={props.onEditAvatar} style={{
                backgroundImage: `url(${userAvatar})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center center`
            }}/>
            <div className="profile__info">
                <h1 className="profile__heading">{userName}</h1>
                <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                <p className="profile__description">{userDescription}</p>
            </div>
            <button className="profile__add" type="button" onClick={props.onAddCard}></button>
        </section>
        <section className="elements">
           {cards.map((card, i) => (
              <Card cardSet = {card} key={i} />
           ))}
        </section>
        <PopupWithForm name='edit' title='Редактировать профиль' isOpen={props.isEditProfilePopupOpen} onClose = {props.onClose}>
            <input className="popup__input popup__input_type_name" type="text" placeholder="Имя" name="name" id="popup-input-name" required minLength="2" maxLength="40"/>
            <span className="popup__input-error popup-input-name-error">Вы пропустили это поле.</span>
            <input className="popup__input popup__input_type_job" type="text" placeholder="О себе" defaultValue=" " name="about" id="popup-input-job" required minLength="2" maxLength="200"/>
            <span className="popup__input-error popup-input-job-error">Вы пропустили это поле.</span>
        </PopupWithForm>
        <PopupWithForm name='card' title='Новое место' buttonText='Создать' isOpen={props.isAddPlacePopupOpen} onClose = {props.onClose}>
            <input className="popup__input popup__input_type_photo-name" type="text" defaultValue=" " placeholder="Название" name="name" id="popup-input-photo-name" required minLength="2" maxLength="30"/>
            <span className="popup__input-error popup-input-photo-name-error">Вы пропустили это поле.</span>
            <input className="popup__input popup__input_type_link" type="url" defaultValue=" " placeholder="Ссылка на картинку" name="link" id="popup-input-link" required/>
            <span className="popup__input-error popup-input-link-error">Вы пропустили это поле.</span>
        </PopupWithForm>
        <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да'/>
        <PopupWithForm name='avatar-edit' title='Обновить аватар' isOpen={props.isEditAvatarPopupOpen} onClose = {props.onClose}>
            <input className="popup__input popup__input_type_link" type="url" defaultValue=" " placeholder="Ссылка на картинку" name="link" id="popup-input-link-avatar" required/>
            <span className="popup__input-error popup-input-link-avatar-error">Ошибка</span>
        </PopupWithForm>
        <PopupFullscreen />
    </main>
  )
  
  
}

export default Main;