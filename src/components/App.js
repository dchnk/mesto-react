import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({});

function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
}

function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen)
}
   
function handleAddCardClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen)
}

function closeAllPopups() {
    setisEditAvatarPopupOpen(false)
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setSelectedCard({})
}

return(

<div className="page">
    <div className="page__content">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddCard = {handleAddCardClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {setSelectedCard}
        />
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={isEditProfilePopupOpen}
            onClose = {closeAllPopups}
        >
            <input className="popup__input popup__input_type_name" type="text" placeholder="Имя" name="name" id="popup-input-name" required minLength="2" maxLength="40"/>
            <span className="popup__input-error popup-input-name-error">Вы пропустили это поле.</span>
            <input className="popup__input popup__input_type_job" type="text" placeholder="О себе" defaultValue="" name="about" id="popup-input-job" required minLength="2" maxLength="200"/>
            <span className="popup__input-error popup-input-job-error">Вы пропустили это поле.</span>
        </PopupWithForm>
        <PopupWithForm
            name='card'
            title='Новое место'
            buttonText='Создать'
            isOpen={isAddPlacePopupOpen}
            onClose = {closeAllPopups}
        >
            <input className="popup__input popup__input_type_photo-name" type="text" defaultValue = ""  placeholder="Название" name="name" id="popup-input-photo-name" required minLength="2" maxLength="30"/>
            <span className="popup__input-error popup-input-photo-name-error">Вы пропустили это поле.</span>
            <input className="popup__input popup__input_type_link" type="url" defaultValue="" placeholder="Ссылка на картинку" name="link" id="popup-input-link" required/>
            <span className="popup__input-error popup-input-link-error">Вы пропустили это поле.</span>
        </PopupWithForm>
        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
        />
        <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            isOpen={isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
        >
            <input className="popup__input popup__input_type_link" type="url" defaultValue="" placeholder="Ссылка на картинку" name="link" id="popup-input-link-avatar" required/>
            <span className="popup__input-error popup-input-link-avatar-error">Ошибка</span>
        </PopupWithForm>
        <ImagePopup onClose ={closeAllPopups} card = {selectedCard}/>
        <Footer />
    </div>
</div>

)

}
export default App;
