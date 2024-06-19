import React from 'react';
import leagueLogo from '../../../assets/img/header/SHL.png'
import logo from '../../../assets/img/logo.png'
import {ReactComponent as Telegram} from "../../../assets/img/header/socials/tg.svg";
import {ReactComponent as VKontakte} from "../../../assets/img/header/socials/vk.svg";
import {ReactComponent as YouTube} from "../../../assets/img/header/socials/youtube.svg";
import {ReactComponent as Auth} from "../../../assets/img/header/auth.svg";
import {ReactComponent as Cart} from "../../../assets/img/header/cart.svg";

import {
    NavLink,
    useNavigate
} from "react-router-dom";
import {
    CART_PATH,
    CHAMPIONSHIP_PATH,
    CLUB_PATH,
    COMMAND_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    MEDIA_PATH,
    MERCHANDISE_PATH,
    NEWS_PATH,
    PERSONAL_PATH
} from "../../../utils/utils";
import {useUser} from "../../../store/User";
import {useCart} from "../../../store/Cart";

const Header = () => {
    const {user} = useUser()
    const {cart} = useCart()
    const history = useNavigate()

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container">
                    <div className="header__top-left">
                        <img src={leagueLogo}
                             alt="league shl"/>
                    </div>
                    <div className="header__top-right">
                        <Telegram width={100}/>
                        <VKontakte width={100}/>
                        <YouTube width={100}/>
                    </div>
                </div>
            </div>
            <div className="header__middle">
                <div className="header__container">
                    <div className="header__middle-left">
                        <img src={logo}
                             alt="logo"/>
                        <span>ХК КАИ Зилант</span>
                    </div>
                    <div style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        alignItems: "center"
                    }}>
                        {
                            user && (
                                <div className="header__middle-right"
                                     style={{
                                         marginRight: '1rem'
                                     }}
                                     onClick={() => history(CART_PATH + "/" + cart)}>
                                <Cart/>
                                <span>Корзина</span>
                            </div>
                            )
                        }
                        <div className="header__middle-right"
                             onClick={() => {
                                 user ? history(`${PERSONAL_PATH}/${user.id}`) : history(LOGIN_PATH);
                             }}>
                            <Auth/>
                            <span>{user ? user.userName : 'Войти'}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="header__bottom">
                <div className="header__container">
                    <ul className="header__bottom-list">
                        <li className="header__bottom-item">
                            <NavLink to={MAIN_PATH}>
                                Главная
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={NEWS_PATH}>
                                Новости
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={CHAMPIONSHIP_PATH}>
                                Чемпионат
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={COMMAND_PATH}>
                                Команда
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={CLUB_PATH}>
                                Клуб
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={MEDIA_PATH}>
                                Медиа
                            </NavLink>
                        </li>
                        <li className="header__bottom-item">
                            <NavLink to={MERCHANDISE_PATH}>
                                Мерч
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
