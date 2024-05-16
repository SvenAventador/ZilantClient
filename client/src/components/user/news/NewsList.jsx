import React from 'react';
import { useNews } from "../../../store/News";
import NewsItem from "./NewsItem";

const NewsList = () => {
    const { getAllNews } = useNews();
    const [allNews, setAllNews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllNews().then(({ news }) => {
            setAllNews(news);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, [getAllNews]);

    return (
        <div className="news-list">
            {
                loading ? (
                    <h2>Загрузка новостей</h2>
                ) : allNews.length > 0 ? (
                    <div className="news-list__grid">
                        {
                            allNews.map((news) => (
                                <NewsItem key={news.id}
                                          news={news} />
                            ))
                        }
                    </div>
                ) : (
                    <h2>Новостей не найдено!</h2>
                )
            }
        </div>
    );
};

export default NewsList;