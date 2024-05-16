import React from 'react';

const CommandItem = (props) => {
    const {
        players
    } = props

    return (
        <div className="players-item">
            <img className="players-item__image"
                 src={`${process.env.REACT_APP_API_PATH}${players.playerImage}`}
                 alt="News Thumbnail"/>
            <h3 className="players-item__name">{players.playerSurname} {players.playerName} {players.playerPatronymic ? players.playerPatronymic : ''}</h3>
            <h3 className="players-item__number">Игровой номер: {players.playerNumber}</h3>
            <h3 className="players-item__position">Позиция игрока: {players.playerPosition}</h3>
        </div>
    );
};

export default CommandItem;
