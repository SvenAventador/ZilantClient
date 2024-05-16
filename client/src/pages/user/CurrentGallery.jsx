import React from 'react';
import {useParams} from "react-router-dom";
import {useGallery} from "../../store/Gallery";
import {Image} from "antd";

const CurrentGallery = () => {
    const {id} = useParams()
    const {getOneGallery} = useGallery()
    const [gallery, setGallery] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        getOneGallery(id).then(({candidate}) => {
            setGallery(candidate)
        })

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [getOneGallery, id])

    return (
        <div className="gallery__container">
            {loading ? (
                <h2>Загрузка изображений</h2>
            ) : gallery.image.length > 0 ? (
                <div className="image-grid"
                     style={{
                         marginTop: '1rem',
                         padding: '1rem'
                     }}>
                    {gallery.image.map((image, index) => (
                        <div key={index}
                             className="image-item">
                            <Image src={`${process.env.REACT_APP_API_PATH}${image.imageName}`}
                                   alt={image.alt}
                                   width={500}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <h2>У данной галереи нет изображений :(</h2>
            )}
        </div>
    );
};

export default CurrentGallery;
