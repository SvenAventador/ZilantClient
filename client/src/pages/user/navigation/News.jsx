import React from 'react';
import NewsList from "../../../components/user/news/NewsList";

const News = () => {
    return (
        <div className="news">
            <div className="news__container">
                <div>
                    <h1 style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 'bolder',
                        fontSize: '30pt',
                        color: '#162746'
                    }}>
                        Новости
                    </h1>
                </div>
                <NewsList/>
            </div>
        </div>
    );
};

export default News;
