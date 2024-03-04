import React from 'react';
import player from '../image/player.png';
import logo from '../image/logo.png';
import { notification } from "antd";
import { useUser } from "../store/UserStore";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {ADMIN_PAGE} from "../utils/utils";

const AuthPage = () => {
    const navigate = useNavigate()
    const {
        registrationUser,
        loginUser
    } = useUser();
    const [isLogin, setIsLogin] = React.useState(true);
    const toggleButton = () => {
        setIsLogin(!isLogin);
    }

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const registration = () => {
        registrationUser(name, email, password).then(() => {
            Swal.fire({
                title: 'Опачки!',
                text: 'Добро пожаловать, друг!',
                icon: 'success'
            }).then(() => {
                navigate(ADMIN_PAGE)
            })
        }).catch((error) => {
            openNotification('error', 'Обратите внимание, тут ошибочка!', error.response.data.message);
        })
    }

    const login = () => {
        loginUser(email, password).then(() => {
            Swal.fire({
                title: 'Опачки!',
                text: 'С возвращением, друг!',
                icon: 'success'
            }).then(() => {
                navigate(ADMIN_PAGE)
            })
        }).catch((error) => {
            openNotification('error', 'Обратите внимание, тут ошибочка!', error.response.data.message);
        })
    }

    return (
        <>
            <div className="auth-page">
                <div className="auth-page__background"/>
                <div className="auth-page__content">
                    <img src={player}
                         alt="LeftCartoon"
                         className="auth-page__left-image"/>
                    <div className="auth-page__right-content">
                        <div className="auth-page__logo">
                            <img src={logo}
                                 alt="Team Logo"
                                 className="auth-page__logo-image"/>
                            <div className="auth-page__team-name">
                                ХК &lt;&lt;КАИ-ЗАЛАНТ&gt;&gt;
                            </div>
                        </div>

                        <div className="auth-page__inputs">
                            <div className="auth-page__inputs--text">
                                {isLogin ? 'Авторизация' : 'Регистрация'}
                            </div>
                            {
                                isLogin ?
                                    null
                                    :
                                    <input type="text"
                                           placeholder="Имя"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="auth-page__input"/>
                            }
                            <input type="email"
                                   placeholder="Почта"
                                   autoComplete="off"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="auth-page__input"/>
                            <input type="password"
                                   placeholder="Пароль"
                                   autoComplete="off"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="auth-page__input"/>
                        </div>

                        <button className="auth-page__auth-button"
                                onClick={isLogin ? login :registration}>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </button>

                        <button className="btn-reset auth-page__change-button"
                                onClick={toggleButton}>
                            {isLogin ? 'Уже есть аккаунт? Войдите!' : 'Нет аккаунта? Зарегистрируйтесь!'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;
