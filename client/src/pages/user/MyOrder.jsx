import React from 'react';
import { getAllUserOrders } from "../../http/order";
import { useUser } from "../../store/User";
import { Image } from "antd";
import {format} from "date-fns";
import {ru} from "date-fns/locale";

const MyOrder = () => {
    const { user } = useUser();
    const [myOrder, setMyOrder] = React.useState([]);

    React.useEffect(() => {
        getAllUserOrders(user.id).then((data) => {
            console.log(data);
            setMyOrder(data);
        });
    }, [user.id]);

    const calculateTotalPrice = (orders) => {
        return orders.reduce((total, order) => {
            return total + order.merchandise_orders.reduce((orderTotal, merchandiseOrder) => {
                return orderTotal + parseFloat(merchandiseOrder.merchandise.merchandisePrice);
            }, 0);
        }, 0);
    };

    const calculateTotalItems = (orders) => {
        return orders.reduce((total, order) => {
            return total + order.merchandise_orders.length;
        }, 0);
    };

    const totalPrice = calculateTotalPrice(myOrder.orders || []);
    const totalItems = calculateTotalItems(myOrder.orders || []);

    return (
        <div className="main-content">
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: '#FFF'
            }}>
                <div className="cart">
                    <h2 style={{
                        color: "#1f3867",
                        fontSize: "30pt"
                    }}>Мои заказы</h2>
                    {
                        myOrder && myOrder.orders && myOrder.orders.length > 0 ? (
                            <>
                                {myOrder.orders.map((order, index) => (
                                    <div key={index} style={{ marginBottom: '2rem' }}>
                                        <h3 style={{
                                            marginBottom: '1rem',
                                            marginTop: '1rem'
                                        }}>Дата заказа: {format(new Date(order.dateOrder), 'd MMMM yyyy год', {locale: ru})}</h3>
                                        <h3 style={{
                                            marginBottom: '1rem'
                                        }}>Статус заказа: {order.delivery_status.typeName}</h3>
                                        {order.merchandise_orders.map((merchandiseOrder, idx) => (
                                            <div key={idx} style={{
                                                display: "flex",
                                                flexFlow: "row wrap",
                                                marginBottom: '1rem'
                                            }}>
                                                <Image src={process.env.REACT_APP_API_PATH + merchandiseOrder.merchandise.merchandiseImage}
                                                       alt={merchandiseOrder.merchandise.merchandiseName}
                                                       width={200}
                                                       height={100} />
                                                <div>
                                                    <p style={{
                                                        marginLeft: '1rem',
                                                        fontSize: '18pt',
                                                    }}>{merchandiseOrder.merchandise.merchandiseName}</p>
                                                    <p style={{
                                                        marginLeft: '1rem',
                                                        fontSize: '18pt',
                                                    }}>{merchandiseOrder.merchandise.merchandisePrice} руб.</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <h1>На данный момент заказрв не найдено!!</h1>
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
                        {totalItems === 1 ? totalItems + " товар" : totalItems > 1 && totalItems < 5 ? totalItems + " товара" : totalItems + " товаров"}
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
                </aside>
            </div>
        </div>
    );
};

export default MyOrder;
