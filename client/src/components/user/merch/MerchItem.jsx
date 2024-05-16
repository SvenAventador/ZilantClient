import React from 'react';
import Modal from "../../modal/Modal";

const MerchItem = (props) => {
    const [modalActive, setModalActive] = React.useState(false)
    const {
        merch
    } = props

    return (
        <>
            <div className="merch-item"
                 onClick={(e) => {
                     e.stopPropagation()
                     setModalActive(true)
                 }}>
                <img className="merch-item__image"
                     src={`${process.env.REACT_APP_API_PATH}${merch.merchandiseImage}`}
                     alt="News Thumbnail"/>
                <h3 className="merch-item__title">{merch.merchandiseName}</h3>
            </div>
            <Modal active={modalActive}
                   setActive={setModalActive}>
                <p className="merch-info__header">
                    Информация о мерче
                </p>
                <p className="merch-info__detail">
                    Название мерча: {merch.merchandiseName}
                </p>
                <p className="merch-info__detail">
                    Описание мерча: {merch.merchandiseDescription}
                </p>
                <p className="merch-info__detail">
                    Количество мерча: {merch.merchandiseAmount}
                </p>
                <p className="merch-info__detail">
                    Цена мерча: {merch.merchandisePrice}
                </p>
            </Modal>
        </>
    );
};

export default MerchItem;
