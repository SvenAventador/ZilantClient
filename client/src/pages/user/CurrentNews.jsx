import React from 'react';
import {useParams} from "react-router-dom";
import {useNews} from "../../store/News";
import {
    Image,
    notification
} from "antd";
import {useUser} from "../../store/User";
import {create} from "../../http/comments";

const CurrentNews = () => {
    const {id} = useParams()
    const {getOneNews} = useNews()
    const {user} = useUser()
    const [api, contextHolder] = notification.useNotification()
    const [currentNews, setOneNews] = React.useState([])
    React.useEffect(() => {
        getOneNews(id).then(({news}) => {
            setOneNews(news)
        })
    }, [getOneNews, id])

    const [comment, setComment] = React.useState('')
    const createComments = () => {
        if (!comment) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите комментарий!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        create(currentNews.id, comment, user.id).then(() => {
            api.success({
                message: 'Внимание!',
                description: 'Комментарий успешно добавлен!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
            getOneNews(id).then(({news}) => {
                setOneNews(news)
            })
            setComment('')
        }).catch((error) => {
            return api.error({
                message: 'Внимание!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    return (
        <div className="news-container">
            {contextHolder}
            {currentNews && (
                <div style={{
                    width: '100%'
                }}>
                    <Image src={`${process.env.REACT_APP_API_PATH}${currentNews.newsImage}`}
                           alt="Изображение новости"
                           className="news-image"/>
                    <h2 className="news-title">{currentNews.newsTitle}</h2>
                    <div className="news-content">
                        {currentNews && currentNews.news_chapters && currentNews.news_chapters.map(chapter => (
                            <p key={chapter.id}>
                                {chapter.newsChapter}
                            </p>
                        ))}
                    </div>
                    {
                        user && user.isAuth && (
                            <>
                                <div className="comments-section">
                                    <h3>Комментарии</h3>
                                    <div className="new-comment">
                                        <input type="text" placeholder="Введите ваш комментарий..."
                                               value={comment}
                                               onChange={(e) => setComment(e.target.value)}
                                               className="comment-input"/>
                                        <button className="comment-button"
                                                onClick={createComments}>
                                            Отправить
                                        </button>
                                    </div>
                                    {currentNews && currentNews.news_comments && currentNews.news_comments.map(comment => (
                                        <div key={comment.id}
                                             className="comment">
                                            <p>
                                                <strong>
                                                    {comment.user.userName || 'Анонимный пользователь'}:
                                                </strong>
                                                {comment.newsComment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default CurrentNews;
