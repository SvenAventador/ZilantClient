import React from 'react';
import player from '../assets/img/player.png';
import logo from '../assets/img/logo.png';
import useAuth from "../func/auth/authorization";

const Auth = () => {
    const { registration, login } = useAuth()

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [isLogin, setIsLogin] = React.useState(true)
    const toggleButton = () => {
        setIsLogin(!isLogin);
    }

    const auth = () => isLogin ? login(email, password) : registration(name, email, password)

    return (
        <div className="auth-page">
            <div className="auth-page__background"/>
            <div className="auth-page__content">
                <img src={player}
                     alt="PlayerCartoon"
                     className="auth-page__left-image"/>
                <div className="auth-page__right-content">
                    <div className="auth-page__logo">
                        <img src={logo}
                             alt="Team Logo"
                             className="auth-page__logo-image"/>
                        <div className="auth-page__team-name">
                            ХК &laquo;КАИ-ЗАЛАНТ&raquo;
                        </div>
                    </div>

                    <div className="auth-page__inputs">
                        <div className="auth-page__inputs--text">
                            {isLogin ? 'Авторизация'
                                : 'Регистрация'}
                        </div>
                        {
                            isLogin ?
                                null
                                :
                                <input type="text"
                                       placeholder="Никнейм"
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
                            onClick={auth}>
                        {isLogin ? 'Войти'
                            : 'Зарегистрироваться'}
                    </button>

                    <button className="btn-reset auth-page__change-button"
                            onClick={toggleButton}>
                        {isLogin ? 'Уже есть аккаунт? Войдите!'
                            : 'Нет аккаунта? Зарегистрируйтесь!'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
