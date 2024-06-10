import React from 'react';
import {getRandom} from "../../../http/news";
import {Image} from "antd";

const MainNews = () => {
    const [oneNews, setOneNews] = React.useState([])
    React.useEffect(() => {
        getRandom().then(({randomNewsRecord}) => {
            console.log(randomNewsRecord)
            setOneNews(randomNewsRecord)
        })
    }, [])


    return (
        <div className="main-news">
            <div className="main-news__left">
                <img src={process.env.REACT_APP_API_PATH + oneNews.newsImage}
                     width={700}
                     height={500}/>
            </div>

        </div>
    );
};

export default MainNews;
