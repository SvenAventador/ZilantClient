import React from 'react';
import {useGallery} from "../../../../store/Gallery";
import MediaItem from "./MediaItem";

const MediaList = () => {
    const {getAllGallery} = useGallery();
    const [allGallery, setAllGallery] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllGallery().then(({galleries}) => {
            setAllGallery(galleries);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, [getAllGallery]);

    return (
        <div className="gallery-list">
            {
                loading ? (
                    <h2>Загрузка галереи команды</h2>
                ) : allGallery.length > 0 ? (
                    <div className="gallery-list__grid">
                        {
                            allGallery.map((gallery) => (
                                <MediaItem key={gallery.id}
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

export default MediaList;
