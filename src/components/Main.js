import { useEffect, useState } from 'react';
import api from '../utils/Api.js';
import Card from './Card';


function Main({onCardClick, onEditProfile, onAddPlace, onEditAvatar, onCardDelete}) {

    const [cards, setCards] = useState([]);
  
    const [userName, setUserName] = useState("...");
    const [userDescription, setUserDescription] = useState("...");
    const [userAvatar, setUserAvatar] = useState("#");
  
  
    useEffect(() => {
      api.getUserInfo()
        .then((res) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
        })
        .catch((err) => console.log(err));
  
      api.getCards()
        .then((res) => {
          const cardsData = res.map((data) => {
            return {
              name: data.name,
              link: data.link,
              likes: data.likes,
              id: data._id,
              ownerId: data.owner._id,
            };
          });
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }, []);



    return (
        <main>
            <section className="profile">
                <button className="profile__avatar-button"
                  type="button"
                  onClick={onEditAvatar}>
                  <img className="profile__avatar" src={userAvatar} alt="аватар" />
                </button>
              <div className="profile__info">
                <div className="profile__info-row">
                  <h1 className="profile__title">{userName}</h1>
                  <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
              </div>
              <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
            {cards.map((card) => (
              <Card 
                 card={card} 
                 key={card.id} 
                 onCardClick={onCardClick} 
                 onCardDelete={onCardDelete} />
              ))}
            </section>
        </main>
    );
}
export default Main;