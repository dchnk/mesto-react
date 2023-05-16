import React from "react";
import api  from "../utils/Api";
import Card  from "./Card";

function Main (props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
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
           {cards.map((card, cardId) => (
              <Card card = {card} key={cardId} onCardClick={props.onCardClick}/>
           ))}
        </section>        
    </main>
  )
}

export default Main;