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

const Gallery = () => {
    const [api, contextHolder] = notification.useNotification()
    const [isOpen, setIsOpen] = React.useState(false)

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
                               <div style={{
                                   display: 'flex',
                                   flexFlow: 'row wrap'
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
                                   Добавить галерею
                               </Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все галереи?"
                                           onConfirm={confirmAllGallery}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все галереи
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <GalleryModal open={isOpen}
                          closeModal={closeModal}/>
        </>
    );
};

export default Gallery;