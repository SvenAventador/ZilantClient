import React from 'react';
import Modal from "../../modal/Modal";

const CommandItem = (props) => {
    const {
        player
    } = props

    const [active, setActive] = React.useState(false);

    return (
        <>
            <div className="players-item" onClick={() => {setActive(true)}}>
                <img className="players-item__image"
                     src={`${process.env.REACT_APP_API_PATH}${player.playerImage}`}
                     alt="News Thumbnail"/>
            </div>
            <Modal active={active} setActive={setActive}>
                <h3 className="players-item__name"> Фамилия Имя Отчество игрока: {player.playerSurname} {player.playerName} {player.playerPatronymic ? player.playerPatronymic : ''}</h3>
                <h3 className="players-item__number">Игровой номер: {player.playerNumber}</h3>
                <h3 className="players-item__position">Позиция игрока: {player.playerPosition}</h3>
            </Modal>
        </>
    );
};

export default CommandItem;
