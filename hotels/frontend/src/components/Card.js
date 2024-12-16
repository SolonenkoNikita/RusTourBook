import React from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    return (
        <div className="element">
            <img className="element__image" alt="Изображение места" src={props.cardsToAdd.link} onClick={() => handleClick()} />
            <button className={cardDeleteButtonClassName} onClick={() => handleDeleteClick(props.cardsToAdd)}></button>
            <div className="element__info">
                <h2 className="element__title">{props.cardsToAdd.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={() => handleLikeClick(props.cardsToAdd)}></button>
                    <p className="element__like-count">{props.cardsToAdd.likes.length}</p>
                </div>
            </div>

        </div>
    );

}

export default Card;