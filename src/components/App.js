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
    const [isLoading, setIsLoading] = React.useState(false);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link    

    React.useEffect(() => {
        api.takeProfileInfoRequest()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch(err => showError(err));
    }, [])

    React.useEffect(() => {
        api.takeCardsRequset()
            .then((cardList) => {
                setCards(cardList);
            })
            .catch(err => showError(err));
    }, [])

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    function showError(err) {
        return console.error(err);
    }

    function handleCardDelete(card) {

        api.deleteItemRequest(card._id)
            .then(() => {
                setCards((state) => state.filter(item => item._id !== card._id));
            })
            .catch(err => showError(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.switchLikeStatusRequest(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => showError(err));
    }

    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleUpdateUser(profileInfo) {
        setIsLoading(true);
        api.editUserInfoRequet(profileInfo)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => showError(err))
            .finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar(profileInfo) {
        setIsLoading(true);
        api.updateProfileInfoRequest(profileInfo)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => showError(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddNewCard(cardInfo) {
        setIsLoading(true);
        api.postNewCardRequest(cardInfo)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => showError(err))
            .finally(() => setIsLoading(false));
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddCard={handleAddCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={setSelectedCard}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddCard={handleAddNewCard}
                        isLoading={isLoading}
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
                        isLoading={isLoading}
                    />
                    <ImagePopup onClose={closeAllPopups} card={selectedCard} />
                    <Footer />
                </div>
            </div>
        </CurrentUserContext.Provider>
    )

}
export default App;
