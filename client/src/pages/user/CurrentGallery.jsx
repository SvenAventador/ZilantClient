import React from 'react';
import { useParams } from "react-router-dom";
import { useGallery } from "../../store/Gallery";
import { Carousel, Spin } from "antd";
import { getOne } from "../../http/video";

const CurrentGallery = (props) => {
    const { photo, video } = props;
    const { id } = useParams();
    const { getOneGallery } = useGallery();
    const [gallery, setGallery] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (photo) {
            getOneGallery(id).then(({ candidate }) => {
                setGallery(candidate);
                setLoading(false);
            });
        }
    }, [photo, getOneGallery, id]);

    React.useEffect(() => {
        if (video) {
            getOne(id).then(({ candidate }) => {
                setGallery(candidate);
                setLoading(false);
            });
        }
    }, [video, id]);

    return (
        <div className="gallery__container">
            {loading ? (
                <div className="loading-container">
                    <Spin size="large" />
                    <h2>Загрузка...</h2>
                </div>
            ) : (
                <>
                    {photo && (
                        gallery.image && gallery.image.length > 0 ? (
                            <>
                                <center>
                                    <h2 style={{
                                        textAlign: 'center',
                                        fontSize: '25pt',
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
                                    }}>Изображения</h2>
                                </center>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <Carousel draggable className="custom-carousel">
                                        {gallery.image.map((item, index) => (
                                            <img src={`${process.env.REACT_APP_API_PATH + item.imageName}`}
                                                 key={index}
                                                 width={400}
                                                 height="auto"
                                                 style={{ minHeight: '500px', objectFit: 'cover' }}
                                                 alt="" />
                                        ))}
                                    </Carousel>
                                </div>
                            </>
                        ) : (
                            <h2>У данной галереи нет изображений :(</h2>
                        )
                    )}

                    {video && (
                        gallery.video && gallery.video.length > 0 ? (
                            <>
                                <center>
                                    <h2 style={{
                                        textAlign: 'center',
                                        fontSize: '25pt',
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
                                    }}>Видео</h2>
                                </center>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <Carousel draggable className="custom-carousel">
                                        {gallery.video.map((item, index) => (
                                            <video controls
                                                   key={index}
                                                   width={400}
                                                   height="auto"
                                                   style={{ minHeight: '500px', objectFit: 'cover' }}
                                            >
                                                <source src={`${process.env.REACT_APP_API_PATH + item.videoName}`}
                                                        type="video/mp4" />
                                                Ваш браузер не поддерживает тег видео.
                                            </video>
                                        ))}
                                    </Carousel>
                                </div>
                            </>
                        ) : (
                            <h2>У данной галереи нет видео :(</h2>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default CurrentGallery;