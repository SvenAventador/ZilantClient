import React from 'react';
import {useClub} from "../../../store/Club";
import {Image} from "antd";

const Championship = () => {
    const {getAllClub} = useClub()
    const [clubs, setClubs] = React.useState([])
    React.useEffect(() => {
        getAllClub().then(({clubs}) => {
            console.log(clubs)
            setClubs(clubs)
        })
    }, [getAllClub])

    return (
        <div className="table__container">
            <h1 style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 'bolder',
                fontSize: '30pt',
                color: '#162746'
            }}>
                Турнирная таблица
            </h1>
            <div className="table-header"
                 style={{
                     fontFamily: 'Raleway',
                     fontSize: '20pt',
                     textAlign: 'center',
                     marginTop: '2rem',
                     padding: '1rem 0',
                     border: '1px solid #D5D5D5'
                 }}>
                Высший дивизион СХЛ РТ
            </div>
            <div className="table-content">
                <div className="table-row"
                     style={{
                         border: '1px solid #D5D5D5',
                     }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: '#D5D5D5',
                        fontWeight: 'bolder',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        paddingLeft: '1rem'
                    }}>
                        <div style={{
                            marginRight: '2.5rem'
                        }}>
                            №
                        </div>
                        <div>
                            Команда
                        </div>
                    </div>
                    <div style={{
                        color: '#D5D5D5',
                        paddingRight: '1rem',
                        fontWeight: 'bolder'
                    }}>
                        Очки
                    </div>
                </div>
                {
                    clubs && clubs.map((item, index) => (
                        <div className="table-row"
                             style={{
                                 border: '1px solid #D5D5D5'
                             }}
                             key={item.id}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingLeft: '1rem',
                                paddingTop: '1rem',
                                paddingBottom: '1rem',
                                alignItems: 'center',
                                fontWeight: 'bold'
                            }}>
                                <div style={{
                                    marginRight: '3rem'
                                }}>
                                    {index + 1}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Image src={`${process.env.REACT_APP_API_PATH}${item.clubImage}`}
                                           width={70}/>
                                    <span style={{
                                        marginLeft: '1rem'
                                    }}>
                                        {item.clubName}
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                paddingRight: '1rem',
                                fontWeight: "bolder"
                            }}>
                                {item.clubPoint}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Championship;
