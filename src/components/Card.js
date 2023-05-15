import React from "react";

function Card(props) {

return(

<article className="element">
  <div className="element__photo" style={{
    backgroundImage: `url(${props.cardSet.link})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`
  }}/>
  <button className="element__bin"></button>
  <div className="element__info">
    <h2 className="element__heading">{props.cardSet.name}</h2>
    <div className="element__like-container">
      <button type="button" className="element__like"></button>
      <p className="element__current-likes">{props.cardSet.likes.length}</p>
    </div>
  </div>
</article>

)

}

export default Card;