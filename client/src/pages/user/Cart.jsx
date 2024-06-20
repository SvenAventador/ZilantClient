import React from 'react';
import {useParams} from "react-router-dom";
import {deleteGood, getAllGoods, updateAmountGood} from "../../http/cart";
import {Image} from "antd";
import {ReactComponent as Trash} from "../../assets/img/trash.svg";
import Swal from "sweetalert2";
import {createOrder} from "../../http/order";

const Cart = () => {
    const {id} = useParams();
    const [allGoods, setAllGoods] = React.useState([]);
    const [quantities, setQuantities] = React.useState({});
    const [totalPrice, setTotalPrice] = React.useState(0);

    React.useEffect(() => {
        getAllGoods(id).then((data) => {
            setAllGoods(data);
            const initialQuantities = {};
            data.forEach(item => {
                initialQuantities[item.id] = item.merchandise_carts[0].count;
            });
            setQuantities(initialQuantities);
            updateTotalPrice(data, initialQuantities);
        });
    }, [id]);

    const updateTotalPrice = (goods, quantities) => {
        let total = 0;
        goods.forEach(item => {
            total += item.merchandisePrice * quantities[item.id];
        });
        setTotalPrice(total);
    };

    const handleIncrease = (merchId) => {
        setQuantities(prevQuantities => {
            const newQuantities = {...prevQuantities};
            const item = allGoods.find(good => good.id === merchId);
            if (prevQuantities[merchId] < item.merchandiseAmount) {
                newQuantities[merchId] = prevQuantities[merchId] + 1;
                updateTotalPrice(allGoods, newQuantities);
                updateAmountGood(id, merchId, newQuantities[merchId])
                    .then(() => updateTotalPrice(allGoods, newQuantities))
                    .catch((error) => {
                        console.log(error);
                    });
            }
            return newQuantities;
        });
    };

    const handleDecrease = (merchId) => {
        setQuantities(prevQuantities => {
            if (prevQuantities[merchId] > 1) {
                const newQuantities = {...prevQuantities, [merchId]: prevQuantities[merchId] - 1};
                updateTotalPrice(allGoods, newQuantities);
                updateAmountGood(id, merchId, newQuantities[merchId])
                    .then(() => updateTotalPrice(allGoods, newQuantities))
                    .catch((error) => {
                        console.log(error);
                    });
                return newQuantities;
            }
            return prevQuantities;
        });
    };

    return (
        <div className={"main-content"}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: '#FFF'
            }}>
                <div className="cart">
                    <h2 style={{
                        color: "#1f3867",
                        fontSize: "30pt"
                    }}>Корзина</h2>
                    {
                        allGoods && allGoods.length > 0 ? (
                            <>
                                {
                                    allGoods.map((merch, index) => (
                                        <div className="cart-item"
                                             key={index}
                                             style={{
                                                 display: "flex",
                                                 justifyContent: "space-between"
                                             }}>
                                            <div style={{
                                                display: "flex",
                                                flexFlow: "row wrap",
                                            }}>
                                                <Image src={process.env.REACT_APP_API_PATH + merch.merchandiseImage}
                                                       alt={merch.merchandiseName}
                                                       width={200}
                                                       height={100}/>
                                                <p style={{
                                                    marginLeft: '1rem',
                                                    fontSize: '18pt',
                                                }}>{merch.merchandiseName}</p>
                                            </div>
                                            <div className="item-info"
                                                 style={{
                                                     marginRight: '3rem',
                                                     display: 'flex',
                                                     justifyContent: 'space-between',
                                                     alignItems: 'center',
                                                 }}>
                                                <div className="quantity-controls"
                                                     style={{
                                                         marginRight: '1rem',
                                                         border: '3px solid gray',
                                                         padding: '5px',
                                                         display: "flex",
                                                         alignItems: 'center',
                                                     }}>
                                                    <button className={"btn-reset"}
                                                            onClick={() => {
                                                                handleDecrease(merch.id);
                                                            }}
                                                            style={{
                                                                color: 'gray',
                                                                marginRight: '.5rem',
                                                                fontSize: '15pt'
                                                            }}>
                                                        -
                                                    </button>
                                                    <span>{quantities[merch.id]}</span>
                                                    <button className={"btn-reset"}
                                                            onClick={() => {
                                                                handleIncrease(merch.id);
                                                            }}
                                                            style={{
                                                                color: 'gray',
                                                                marginRight: '.5rem',
                                                                fontSize: '15pt'
                                                            }}>
                                                        +
                                                    </button>
                                                </div>
                                                <p style={{
                                                    fontSize: '15pt'
                                                }}>{merch.merchandisePrice} руб.</p>
                                                <button className={"btn-reset"} onClick={() => {
                                                    deleteGood(id, merch.id).then(() => {
                                                        getAllGoods(id).then((data) => {
                                                            setAllGoods(data);
                                                            const initialQuantities = {};
                                                            data.forEach(item => {
                                                                initialQuantities[item.id] = item.merchandise_carts[0].count;
                                                            });
                                                            setQuantities(initialQuantities);
                                                            updateTotalPrice(data, initialQuantities);
                                                        });
                                                    }).catch((error) => {
                                                        return Swal.fire({
                                                            title: 'Внимание!',
                                                            text: error.response.data.message,
                                                            icon: 'error'
                                                        })
                                                    })
                                                }}>
                                                    <Trash width={50}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <h1>На данный момент в корзине нет товаров!</h1>
                        )
                    }
                </div>
                <aside className="order-summary" style={{
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        color: "#1f3867",
                        fontSize: "30pt",
                        paddingBottom: '2rem'
                    }}>Ваш заказ</h2>

                    <p style={{
                        paddingBottom: '2rem'
                    }}>
                        {allGoods.length === 1 ? allGoods.length + " товар" : allGoods.length > 1 && allGoods.length < 5 ? allGoods.length + " товара" : allGoods.length + " товаров"}
                    </p>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: '2rem'
                    }}>
                        <p style={{
                            color: "#000",
                            fontWeight: "bolder"
                        }}>
                            Итого
                        </p>
                        <p style={{
                            color: "#000",
                            fontWeight: "bolder"
                        }}>
                            {totalPrice} руб
                        </p>
                    </div>
                    <button className="order-button" style={{
                        backgroundColor: "#000149",
                        color: "#fff",
                    }}
                            disabled={!allGoods.length}
                            onClick={() => {
                                createOrder(id, totalPrice).then(() => {
                                    getAllGoods(id).then((data) => {
                                        setAllGoods(data);
                                    })

                                    return Swal.fire({
                                        title: 'Внимание!',
                                        text: 'Заказ успешно сформирован!',
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
                        Оформить заказ
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
