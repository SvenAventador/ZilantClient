import React from 'react';
import {useGallery} from "../../store/Gallery";
import {
    Button,
    Image,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import GalleryModal from "./modals/GalleryModal";
import {deleteAll, deleteOne, getAll, getAllWithVideo} from "../../http/video";
import GalleryVideoModal from "./modals/GalleryVideoModal";

const Gallery = () => {
    const [api, contextHolder] = notification.useNotification()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isVideoOpen, setIsVideoOpen] = React.useState(false)

    const {
        getAllGalleryWithImage,
        deleteAllGallery,
        deleteOneGallery
    } = useGallery()

    const [galleries, setGalleries] = React.useState([])
    React.useEffect(() => {
        getAllGalleryWithImage().then(({galleries}) => {
            setGalleries(galleries)
        })
    }, [getAllGalleryWithImage])

    const [video, setVideo] = React.useState([])
    React.useEffect(() => {
        getAll().then(({galleries}) => {
            setVideo(galleries);
        });
    }, [])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Заголовок галереи',
            dataIndex: 'galleryTitle',
            key: 'galleryTitle',
        },
        {
            title: 'Описание галереи',
            dataIndex: 'galleryDescription',
            key: 'galleryDescription'
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Popconfirm title="Вы уверены, что хотите удалить эту галерею?"
                                    onConfirm={() => confirmOneGallery(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить галерею
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const videoColumn = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Заголовок галереи',
            dataIndex: 'galleryTitle',
            key: 'galleryTitle',
        },
        {
            title: 'Описание галереи',
            dataIndex: 'galleryDescription',
            key: 'galleryDescription'
        },
        {
            title: 'Изображение',
            dataIndex: 'galleryImage',
            key: 'galleryImage',
            render: (text, record) => (
                <Image src={`${process.env.REACT_APP_API_PATH}${record.galleryImage}`}
                       alt="Изображение галереи"
                       style={{
                           maxWidth: '100px',
                           maxHeight: '100px'
                       }}/>
            )
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Popconfirm title="Вы уверены, что хотите удалить эту галерею?"
                                    onConfirm={() => confirmOneVideoGallery(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить видео галерею
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const customEmptyText = (
        <div>
            <SearchOutlined style={{
                fontSize: 24,
                color: '#999'
            }}/>
            <p>Пустоватенько...</p>
        </div>
    )

    const showModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        getAllGalleryWithImage().then(({galleries}) => {
            setGalleries(galleries)
        })

        setIsOpen(false)
    }

    const showVideoModal = () => {
        setIsVideoOpen(true)
    }
    const closeVideoModal = () => {
        getAllWithVideo().then(({galleries}) => {
            setVideo(galleries)
        })

        setIsVideoOpen(false)
    }

    const confirmOneGallery = (id) => {
        deleteOneGallery(id).then(() => {
            getAllGalleryWithImage().then(({galleries}) => {
                setGalleries(galleries)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Галерея с номером ${id} успешно удалена!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmOneVideoGallery = (id) => {
        deleteOne(id).then(() => {
            getAllWithVideo().then(({galleries}) => {
                setVideo(galleries)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Галерея с номером ${id} успешно удалена!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllGallery = () => {
        deleteAllGallery().then(() => {
            getAllGalleryWithImage().then(({galleries}) => {
                setGalleries(galleries)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Галереи успешно удалены!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllVideoGallery = () => {
        deleteAll().then(() => {
            getAllWithVideo().then(({galleries}) => {
                setVideo(galleries)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Галереи успешно удалены!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    return (
        <>
            {contextHolder}
            <Table columns={column}
                   dataSource={galleries.map((gallery) => ({
                           ...gallery, key: gallery.id
                       })
                   )}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <div>
                                   <div style={{
                                       display: 'flex',
                                       flexFlow: 'column'
                                   }}>
                                       <div style={{
                                           display: 'flex',
                                           flexFlow: 'row wrap',
                                           marginBottom: '1rem'
                                       }}>
                                           {
                                               record.image.map((images, index) => (
                                                   <Image style={{
                                                       width: '100px',
                                                       height: '100px',
                                                       marginRight: '1rem'
                                                   }}
                                                          key={index}
                                                          src={`${process.env.REACT_APP_API_PATH}${images.imageName}`}
                                                          aria-label="Изобрадение галереи"
                                                          alt="Изображение галереи"
                                                   />
                                               ))
                                           }
                                       </div>
                                       <div style={{
                                           display: 'flex',
                                           flexFlow: 'row wrap'
                                       }}>
                                           {
                                               record.video && record.video.length > 0 && (
                                                   record.video.map((video, index) => (
                                                       <video key={index}
                                                              controls
                                                              preload="true"
                                                              width="30%"
                                                              src={`${process.env.REACT_APP_API_PATH}${video.videoName}`}
                                                              type="video/webm"
                                                       />
                                                   ))
                                               )
                                           }
                                       </div>
                                   </div>
                               </div>
                           )
                       },
                       rowExpandable: (record) => record.image.length !== null
                   }}
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   title={() => {
                       return (
                           <Space size="large">
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => {
                                           showModal()
                                       }}>
                                   Добавить фото галерею
                               </Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все галереи?"
                                           onConfirm={confirmAllGallery}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все фото галереи
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />

            <Table columns={videoColumn}
                   dataSource={video.map((gallery) => ({
                           ...gallery, key: gallery.id
                       })
                   )}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <div>
                                   <div style={{
                                       display: 'flex',
                                       flexFlow: 'column'
                                   }}>
                                       <div style={{
                                           display: 'flex',
                                           flexFlow: 'row wrap'
                                       }}>
                                           {
                                               record.video && record.video.length > 0 && (
                                                   record.video.map((video, index) => (
                                                       <video key={index}
                                                              controls
                                                              preload="true"
                                                              width="30%"
                                                              src={`${process.env.REACT_APP_API_PATH}${video.videoName}`}
                                                              type="video/webm"
                                                       />
                                                   ))
                                               )
                                           }
                                       </div>
                                   </div>
                               </div>
                           )
                       },
                       rowExpandable: (record) => record.video.length !== null
                   }}
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   title={() => {
                       return (
                           <Space size="large">
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => {
                                           showVideoModal()
                                       }}>
                                   Добавить видео галерею
                               </Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все галереи?"
                                           onConfirm={confirmAllVideoGallery}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все видео галереи
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <GalleryModal open={isOpen}
                          closeModal={closeModal}/>
            <GalleryVideoModal open={isVideoOpen}
                               closeModal={closeVideoModal}/>
        </>
    );
};

export default Gallery;