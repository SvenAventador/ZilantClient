import React, {useState} from 'react';
import {Modal, Button, Form, Input} from 'antd';
import {ReactComponent as Email} from "../../assets/img/email.svg";
import logo from "../../assets/img/logo.png";
import {useUser} from "../../store/User";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH, ORDER_PATH} from "../../utils/utils";
import InputMask from 'react-input-mask';
import Swal from "sweetalert2";
import {getAllUserOrders} from "../../http/order";

const Personal = () => {
    const {user, edit, logoutUser} = useUser();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const [myOrder, setMyOrder] = React.useState([]);
    React.useEffect(() => {
        user && getAllUserOrders(user.id).then((data) => {
            setMyOrder(data);
        })
    }, [user, user?.id])

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                user && edit(user?.id, values).then(() => {
                    setIsModalVisible(false);
                    return Swal.fire({
                        title: 'Внимание!',
                        text: 'Поздравляем с успешным обновлением данных!',
                        icon: 'success'
                    })
                }).catch((error) => {
                    return Swal.fire({
                        title: 'Внимание!',
                        text: error.response.data.message,
                        icon: 'error'
                    })
                })
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                navigate(MAIN_PATH);
            })
        })
    }

    return (
        <div className="personal-container">
            <div style={{
                backgroundColor: '#FFF',
                marginTop: '2rem',
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    padding: '1rem'
                }}>
                    <p style={{
                        fontSize: '20pt',
                        fontWeight: 'bolder',
                        paddingTop: '1rem',
                        paddingBottom: '3rem'
                    }}>{user?.userName}</p>
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        alignItems: 'center',
                        paddingBottom: '10rem'
                    }}>
                        <Email width={50}/>
                        <p style={{
                            fontSize: '20pt',
                            fontWeight: 'bolder',
                            marginLeft: '1rem',
                        }}>{user?.userEmail}</p>
                    </div>

                    <button className="btn-reset"
                            onClick={showModal}
                            style={{
                                fontSize: '20pt',
                                fontWeight: 'bolder',
                            }}>
                        Редактировать
                    </button>
                    <button className="btn-reset" onClick={handleLogout}
                            style={{
                                fontSize: '20pt',
                                fontWeight: 'bolder',
                            }}>
                        Выйти
                    </button>
                </div>
                <div style={{
                    backgroundColor: '#1f3867',
                    width: '500px',
                    height: '300px',
                    borderRadius: '30px',
                    marginRight: '4rem',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingLeft: '3rem',
                        paddingTop: '1rem',
                        paddingBottom: '7rem'
                    }}>
                        <div style={{
                            marginRight: '1rem'
                        }}>
                            <img src={logo}
                                 alt=""
                                 style={{
                                     width: '65px',
                                     height: '80px',
                                 }}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#FFF',
                                fontSize: '20pt'
                            }}>
                                ХК «КАИ-ЗИЛАНТ»
                            </p>
                            <p style={{
                                color: '#FFF',
                                fontSize: '18pt'
                            }}>
                                Казань
                            </p>
                        </div>
                    </div>
                    <Button type="link"
                            onClick={(e) => {
                                if (myOrder?.orders?.length) {
                                    navigate(ORDER_PATH + "/" + user?.id)
                                } else {
                                    e.stopPropagation();

                                    return Swal.fire({
                                        title: 'Внимание!',
                                        text: 'У Вас еще нет заказов!',
                                        icon: 'warning'
                                    })
                                }
                            }}
                            style={{
                                color: "#FFF",
                                fontSize: '20pt',
                                paddingLeft: '3rem'
                            }}>
                        Мои заказы
                    </Button>
                </div>
            </div>

            <Modal title="Редактировать данные"
                   open={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                <Form form={form}
                      layout="vertical">
                    <Form.Item name="userName"
                               label="Имя пользователя">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="userEmail"
                               label="Почта пользователя">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="userPassword"
                               label="Пароль">
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name="userFio"
                               label="ФИО">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="userAddress"
                               label="Адрес">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="userPhone"
                               label="Телефон">
                        <InputMask mask="+7 (999) 999-99-99"
                                   value={user?.userPhone}>
                            {(inputProps) => <Input {...inputProps} />}
                        </InputMask>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Personal;
