import React from 'react';
import MediaList from "../../../components/user/media/MediaList";

const Media = () => {
    return (
        <div className="gallery">
            <div className="gallery__container">
                <h1 style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '30pt',
                    color: '#162746'
                }}>
                    Наша галерея
                </h1>
                <MediaList/>
            </div>
        </div>
    );
};

export default Media;
