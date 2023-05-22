import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

const [link, setLink] = React.useState('');
const linkRef = React.useRef();

React.useEffect(() => {
    setLink('');
}, [props.isOpen])

function handleChangeInput() {
    
    setLink(linkRef.current.value)
}

function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: link,
    });
}

return(
    <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input className="popup__input popup__input_type_link" onChange={handleChangeInput} ref={linkRef} value={link ? link: ''} type="url"  placeholder="Ссылка на картинку" name="link" id="popup-input-link-avatar" required/>
            <span className="popup__input-error popup-input-link-avatar-error">Ошибка</span>
    </PopupWithForm>
)


}

export default EditAvatarPopup;