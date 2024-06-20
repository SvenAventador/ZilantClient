import React from 'react';
import {useNavigate} from "react-router-dom";
import {GALLERY_PATH} from "../../../../utils/utils";

const VideoItem = (props) => {
    const {
        gallery
    } = props
    const history = useNavigate()
    const handleClick = () => {
        history(`${GALLERY_PATH}/video/${gallery.id}`)
    }
    return (
        <div className="gallery-item" onClick={handleClick}>
            <img className="gallery-item__image"
                 src={`${process.env.REACT_APP_API_PATH}${gallery.galleryImage}`}
                 alt="Gallery Thumbnail"/>
            <h3 className="gallery-item__name">{gallery.galleryTitle}</h3>
        </div>
    );
};

export default VideoItem;