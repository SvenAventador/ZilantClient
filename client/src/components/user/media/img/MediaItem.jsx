import React from 'react';
import {GALLERY_PATH} from "../../../../utils/utils";
import {useNavigate} from "react-router-dom";

const MediaItem = (props) => {
    const {
        gallery
    } = props
    const history = useNavigate()
    const handleClick = () => {
        history(`${GALLERY_PATH}/photo/${gallery.id}`)
    }

    return (
        <div className="gallery-item" onClick={handleClick}>
            <img className="gallery-item__image"
                 src={`${process.env.REACT_APP_API_PATH}${gallery.image[0].imageName}`}
                 alt="Gallery Thumbnail"/>
            <h3 className="gallery-item__name">{gallery.galleryTitle}</h3>
        </div>
    );
};

export default MediaItem;
