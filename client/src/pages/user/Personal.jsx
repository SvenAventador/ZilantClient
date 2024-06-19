import React from 'react';
import {useParams} from "react-router-dom";
import {ReactComponent as Email} from "../../assets/img/email.svg";
import logo from "../../assets/img/logo.png";
import {useUser} from "../../store/User";
const Personal = () => {
    const {user} = useUser()
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
                    }}>{user.userName}</p>
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
                        }}>{user.userEmail}</p>
                    </div>

                    <button className={"btn-reset"} style={{
                        fontSize: '20pt',
                        fontWeight: 'bolder',
                    }}>
                        Редактировать
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
                            <img src={logo} alt="" style={{
                                width: '65px',
                                height: '80px',
                            }}/>
                        </div>
                        <div>
                            <p style={{
                                color: '#FFF',
                                fontSize: '20pt'
                            }}>ХК «КАИ-ЗИЛАНТ»</p>
                            <p style={{
                                color: '#FFF',
                                fontSize: '18pt'
                            }}>Казань</p>
                        </div>
                    </div>
                    <button className={"btn-reset"} style={{
                        color: "#FFF",
                        fontSize: '20pt',
                        paddingLeft: '3rem'
                    }}>Мои заказы</button>
                </div>
            </div>
        </div>
    );
};

export default Personal;
