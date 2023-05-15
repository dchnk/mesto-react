import React from "react";

function PopupFullscreen(props) {

return(

<div className={props.card.name ? ("popup popup_type_fullscreen popup_opened") : ("popup popup_type_fullscreen")}>
  <div className="popup__container popup__container_type_fullscreen">
    <button type="button" className="popup__close" onClick={props.onClose}></button>
    <img className="popup__image" alt={props.card.name} src={props.card.link}/>
    <h2 className="popup__image-name">{props.card.name}</h2>
  </div>
</div>

)


}

export default PopupFullscreen;