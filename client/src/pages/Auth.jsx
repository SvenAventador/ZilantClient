import React from 'react';
import player from '../assets/img/player.png';
import logo from '../assets/img/logo.png';
import {notification} from "antd";
import {useUser} from "../store/User";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {
    ADMIN_PATH,
    MAIN_PATH
} from "../utils/utils";

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

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        })
    }

    const registration = () => {
        if (!name) {
            return openNotification('error', 'Обратите внимание, тут ошибочка!', 'Пожалуйста, введите имя!')
        }
        if (!email) {
            return openNotification('error', 'Обратите внимание, тут ошибочка!', 'Пожалуйста, введите почту!')
        }
        if (!password) {
            return openNotification('error', 'Обратите внимание, тут ошибочка!', 'Пожалуйста, введите пароль!')
        }

        const user = new FormData()
        user.append('userName', name)
        user.append('userEmail', email)
        user.append('userPassword', password)

        registrationUser(user).then(() => {
            Swal.fire({
                title: 'Опачки!',
                text: 'Добро пожаловать, друг!',
                icon: 'success'
            }).then(() => {
                navigate(MAIN_PATH)
            })
        }).catch((error) => {
            openNotification('error', 'Обратите внимание, тут ошибочка!', error.response.data.message)
        })
    }

    const login = () => {
        if (!email) {
            return openNotification('error', 'Обратите внимание, тут ошибочка!', 'Пожалуйста, введите почту!')
        }
        if (!password) {
            return openNotification('error', 'Обратите внимание, тут ошибочка!', 'Пожалуйста, введите пароль!')
        }

        const user = new FormData()
        user.append('userEmail', email)
        user.append('userPassword', password)

        loginUser(user).then((data) => {
            data.userRole === 'ADMIN' ? navigate(ADMIN_PATH) : navigate(MAIN_PATH)
            return Swal.fire({
                title: 'Опачки!',
                text: 'С возвращением, друг!',
                icon: 'success'
            })
        }).catch((error) => {
            openNotification('error', 'Обратите внимание, тут ошибочка!', error.response.data.message)
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
                                ХК &laquo;&laquo;КАИ-ЗАЛАНТ&raquo;&raquo;
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
                                onClick={isLogin ? login : registration}>
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
