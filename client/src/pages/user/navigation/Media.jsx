import React from 'react';
import MediaList from "../../../components/user/media/img/MediaList";
import VideoList from "../../../components/user/media/vid/VideoList";

const Media = (props) => {
    const {
        photo,
        video
    } = props
    return (
        <div className="gallery">
            {
                photo && (
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
                )
            }
            {
                video && (
                    <div className="gallery__container">
                        <h1 style={{
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 'bolder',
                            fontSize: '30pt',
                            color: '#162746'
                        }}>
                            Наша галерея
                        </h1>
                        <VideoList/>
                    </div>
                )
            }
        </div>
    );
};

export default Media;
