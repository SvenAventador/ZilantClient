import React from 'react';
import {getRandom} from "../../../http/news";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {useNavigate} from "react-router-dom";
import {CURRENT_NEWS_PATH, NEWS_PATH} from "../../../utils/utils";
import logo from "../../../assets/img/overall.jpg";
const MainNews = () => {
    const [oneNews, setOneNews] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        getRandom().then(({randomNewsRecord}) => {
            console.log(randomNewsRecord);
            setOneNews(randomNewsRecord);
        });
    }, []);

    return (
        <div className="main-news" style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '20px',
        }}>
            {oneNews ? (
                <>
                    <div className="main-news__left"
                         onClick={() => {navigate(CURRENT_NEWS_PATH + '/' + oneNews.id)}}>
                        <img src={process.env.REACT_APP_API_PATH + oneNews.newsImage}
                             style={{
                                 width: '700px',
                                 height: 'auto'
                             }}
                             alt={""}/>
                    </div>
                    <div className="main-news__right" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        backgroundColor: "white"
                    }}>
                        <div>
                            <p style={{
                                fontSize: '20pt',
                                color: "gray",
                                paddingTop: '.5rem'
                            }}>
                                {oneNews.newsDate && format(new Date(oneNews.newsDate), 'd MMMM yyyy', {locale: ru})}
                            </p>
                            <p style={{
                                color: '#1F3867',
                                fontSize: '30pt',
                                marginTop: '1.5rem',
                                fontWeight: "bolder",
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.5em',
                                maxHeight: '4.5em',
                                wordBreak: 'break-word'
                            }}>
                                {oneNews.newsTitle}
                            </p>
                            <p style={{
                                color: 'gray',
                                fontSize: '20pt',
                                marginTop: '1rem',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                lineHeight: '1.5em',
                                maxHeight: '4.5em',
                                wordBreak: 'break-word'
                            }}>
                                {oneNews.newsDescription}
                            </p>
                        </div>
                        <div style={{
                            marginTop: 'auto' // Позиционирование кнопки внизу
                        }}>
                            <div style={{
                                borderBottom: '1px solid gray',
                            }}></div>
                            <button className="btn-reset main-news__right--btn"
                                    style={{
                                        border: '1px solid #1F3867',
                                        marginTop: '1.5rem',
                                        padding: '1rem',
                                        borderRadius: '15px'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(NEWS_PATH)
                                    }}>
                                Перейти к новостям
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    marginRight: 0,
                    paddingRight: 0
                }}>
                    <img src={logo} />
                </div>
            )}
        </div>
    );
};

export default MainNews;