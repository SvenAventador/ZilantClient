import React from 'react';
import {getAll} from "../../../../http/video";
import VideoItem from "./VideoItem";

const VideoList = () => {
    const [allGallery, setAllGallery] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getAll().then(({galleries}) => {
            setAllGallery(galleries);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, []);

    return (
        <div className="gallery-list">
            {
                loading ? (
                    <h2>Загрузка галереи команды</h2>
                ) : allGallery.length > 0 ? (
                    <div className="gallery-list__grid">
                        {
                            allGallery.map((gallery) => (
                                <VideoItem key={gallery.id}
                                           gallery={gallery}/>
                            ))
                        }
                    </div>
                ) : (
                    <h2>Галереи не найдено!</h2>
                )
            }
        </div>
    );
};

export default VideoList;