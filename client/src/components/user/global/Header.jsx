import React, {useState} from 'react';
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
    const {user} = useUser();
    const {cart} = useCart();
    const history = useNavigate();
    const [championshipDropdown, setChampionshipDropdown] = useState(false);
    const [mediaDropdown, setMediaDropdown] = useState(false);

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__container">
                    <div className="header__top-left">
                        <NavLink to={'https://shlru.ru/'}>
                            <img src={leagueLogo} alt="league shl"/>
                        </NavLink>
                    </div>
                    <div className="header__top-right">
                        <NavLink to={'https://t.me/HC_KAI'}>
                            <Telegram width={100}/>
                        </NavLink>
                        <NavLink to={'https://vk.com/hc_kai'}>
                            <VKontakte width={100}/>
                        </NavLink>
                        <NavLink to={'https://m.youtube.com/@hckai'}>
                            <YouTube width={100}/>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="header__middle">
                <div className="header__container">
                    <div className="header__middle-left"
                         style={{
                             cursor: 'pointer'
                         }}
                         onClick={() => history(MAIN_PATH)}>
                        <img src={logo}
                             alt="logo"/>
                        <span>
                            ХК КАИ Зилант
                        </span>
                    </div>
                    <div style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        alignItems: "center"
                    }}>
                        {user && (
                            <div className="header__middle-right"
                                 style={{marginRight: '1rem'}}
                                 onClick={() => history(CART_PATH + "/" + cart)}>
                                <Cart style={{fill: "black", display: "block"}}/>
                                <span>Корзина</span>
                            </div>
                        )}
                        <div className="header__middle-right"
                             onClick={() => {
                                 user ? history(`${PERSONAL_PATH}/${user.id}`) : history(LOGIN_PATH);
                             }}>
                            <Auth/>
                            <span style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100px'
                            }}>
                                {user ? user.userName : 'Войти'}
                            </span>
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
                        <li className="header__bottom-item"
                            onMouseEnter={() => setChampionshipDropdown(true)}
                            onMouseLeave={() => setChampionshipDropdown(false)}>
                            <div>
                                Чемпионат
                            </div>
                            {championshipDropdown && (
                                <ul className="dropdown">
                                    <li>
                                        <NavLink to={CHAMPIONSHIP_PATH + '/table'}>
                                            Турнирная таблица
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={CHAMPIONSHIP_PATH + "/calendar"}>
                                            Календарь
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
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
                        <li className="header__bottom-item"
                            onMouseEnter={() => setMediaDropdown(true)}
                            onMouseLeave={() => setMediaDropdown(false)}>
                            <div >
                                Медиа
                            </div>
                            {mediaDropdown && (
                                <ul className="dropdown">
                                    <li>
                                        <NavLink to={MEDIA_PATH + '/photo'}>
                                            Фото
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={MEDIA_PATH + '/video'}>
                                            Видео
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
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