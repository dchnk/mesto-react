import React from "react";

function Card(props) {

function onClick() {
  props.onCardClick(props.card)
}

return(

<article className="element" onClick={onClick}>
  <div className="element__photo" style={{
    backgroundImage: `url(${props.card.link})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`
  }}/>
  <button className="element__bin"></button>
  <div className="element__info">
    <h2 className="element__heading">{props.card.name}</h2>
    <div className="element__like-container">
      <button type="button" className="element__like"></button>
      <p className="element__current-likes">{props.card.likes.length}</p>
    </div>
  </div>
</article>

)
}

export default Card;