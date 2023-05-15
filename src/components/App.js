import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

function App() {

const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);

return(

<div className="page">
    <div className="page__content">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            isEditProfilePopupOpen = {isEditProfilePopupOpen}
            onAddCard = {handleAddCardClick}
            isAddPlacePopupOpen = {isAddPlacePopupOpen}
            onEditAvatar = {handleEditAvatarClick}
            isEditAvatarPopupOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
        />
        <Footer />
    </div>
</div>

)

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
}
}
export default App;
