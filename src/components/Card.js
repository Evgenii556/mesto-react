function Card({ card, onCardClick, onCardDelete}) {
  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return ( 
    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="element__image-info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
            <button className="element__like" type="button"></button>
            <span className="element__like-counter">{card.likes.length}</span>
        </div>
        <button className="element__delete" type="button" onClick={handleDeleteClick} ></button>
      </div>
    </div>
  );
}

export default Card;