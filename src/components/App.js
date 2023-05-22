import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {

const [currentUser, setCurrentUser] = React.useState({});
const [cards, setCards] = React.useState([]);
const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({});

React.useEffect(() => {
    api.takeProfileInfoRequest()
        .then((res) => {
            setCurrentUser(res);
        })    
}, [])

React.useEffect(() => {
    api.takeCardsRequset()
        .then((cardList) => {
            setCards(cardList);            
        }) 
  }, [])

function handleCardDelete(card) {
        
    api.deleteItemRequest(card._id)
    .then(() => {
        setCards((state) => state.filter(item => item._id !== card._id));
     });
    
}  

function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.switchLikeStatusRequest(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
         });
} 

function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
}

function handleUpdateUser(profileInfo) {
    api.editUserInfoRequet(profileInfo)
    .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
    })
    
}

function handleUpdateAvatar(profileInfo) {
    api.updateProfileInfoRequest(profileInfo)
    .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
    })
    
}

function handleAddNewCard(cardInfo) {
    api.postNewCardRequest(cardInfo)
    .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
    
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
<CurrentUserContext.Provider value={currentUser}>
<div className="page">
    <div className="page__content">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddCard = {handleAddCardClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {setSelectedCard}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
        />
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} 
            onAddCard={handleAddNewCard}
        />
        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
        />
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
        /> 
        <ImagePopup onClose ={closeAllPopups} card = {selectedCard} />
        <Footer />
    </div>
</div>
</CurrentUserContext.Provider>
)

}
export default App;
