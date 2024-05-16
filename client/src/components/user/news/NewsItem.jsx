import React from 'react';
import {useNavigate} from "react-router-dom";
import {CURRENT_NEWS_PATH} from "../../../utils/utils";

const NewsItem = (props) => {
    const {
        news
    } = props
    const history = useNavigate()
    const handleClick = () => {
        history(`${CURRENT_NEWS_PATH}/${news.id}`)
    }

    return (
        <div className="news-item"
             onClick={handleClick}>
            <img className="news-item__image"
                 src={`${process.env.REACT_APP_API_PATH}${news.newsImage}`}
                 alt="News Thumbnail"/>
            <h3 className="news-item__title">{news.newsTitle}</h3>
            <h3 className="news-item__date">{news.newsDate}</h3>
        </div>
    );
};

export default NewsItem;
