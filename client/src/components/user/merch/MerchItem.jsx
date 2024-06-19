import React from 'react';
import Modal from "../../modal/Modal";
import {useUser} from "../../../store/User";
import {useCart} from "../../../store/Cart";
import {createGood} from "../../../http/cart";
import Swal from "sweetalert2";

const MerchItem = (props) => {
    const [modalActive, setModalActive] = React.useState(false)
    const {
        merch
    } = props

    const {user} = useUser()
    const {cart} = useCart()

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
                {
                    user && (
                        <button style={{
                            width: "100%",
                            backgroundColor: "#000149",
                            color: '#FFF',
                            padding: '10px',
                            borderRadius: '20px'
                        }}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    createGood(cart, merch.id).then(() => {
                                        return Swal.fire({
                                            title: 'Внимание!',
                                            text: 'Товар успешно добавлен в корзину!',
                                            icon: 'success'
                                        })
                                    }).catch((error) => {
                                        return Swal.fire({
                                            title: 'Внимание!',
                                            text: error.response.data.message,
                                            icon: 'error'
                                        })
                                    })
                                }}>
                            Добавить товар в корзину
                        </button>
                    )
                }
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
