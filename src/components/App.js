import { useState } from "react";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardDelete={handleDeleteCardClick} />
      <Footer />

      <PopupWithForm
        name='type_edit'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" id="name-input" name="name" minLength="2" maxLength="40" type="text" placeholder="Имя" required />
        <span className="popup__input-error name-input-error"></span>
        <input className="popup__input popup__input_type_job" id="GET-about" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name='type_add'
        title='Новое место'
        buttonText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" id="GET-title" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error title-input-error" ></span>
        <input className="popup__input popup__input_type_job" id="GET-url" type="url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name='type_avatar'
        title='Обновить аватар'
        buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_avatar" id="GET-image-link" type="url" name="link" placeholder="Ссылка" required />
        <span className="popup__input-error avatar-input-error" ></span>
      </PopupWithForm>

      <PopupWithForm
        name='confirm'
        title='Вы уверенны?'
        buttonText='Да'
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      ></ImagePopup>
    </div>
  );
}

export default App;