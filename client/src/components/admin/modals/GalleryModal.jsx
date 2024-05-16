import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useGallery} from "../../../store/Gallery";

const {TextArea} = Input

const GalleryModal = (props) => {
    const {
        open,
        closeModal
    } = props
    const {
        createGallery
    } = useGallery()
    const [api, contextHolder] = notification.useNotification()

    const [galleryTitle, setGalleryTitle] = React.useState('')
    const [galleryDescription, setGalleryDescription] = React.useState('')
    const [image, setImage] = React.useState([])
    const [imageUploadKey, setImageUploadKey] = React.useState(Date.now())

    React.useEffect(() => {
        if (!open) {
            setGalleryTitle('')
            setGalleryDescription('')
            setImage([])
            setImageUploadKey(Date.now())
        }
    }, [open])

    const addGallery = () => {
        if (!galleryTitle) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите название галереи!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!galleryDescription) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите описание галереи!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const gallery = new FormData()
        gallery.append('galleryTitle', galleryTitle)
        gallery.append('galleryDescription', galleryDescription)
        image.forEach((images) => {
            gallery.append('image', images)
        })

        createGallery(gallery).then(() => {
            api.success({
                message: 'Внимание!',
                description: 'Поздравляем с успешным добавлением галереи!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })

            closeModal()
        }).catch((error) => {
            return api.error({
                message: 'Внимание!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={'Добавление галереи'}
                   onCancel={closeModal}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button style={{
                           backgroundColor: 'red',
                           color: 'white'
                       }}
                               onClick={closeModal}>
                           Отмена
                       </Button>,
                       <Button style={{
                           backgroundColor: 'green',
                           color: 'white'
                       }}
                               onClick={addGallery}>
                           Добавить
                       </Button>
                   ]}>
                <Input value={galleryTitle}
                       onChange={(e) => setGalleryTitle(e.target.value)}
                       style={{
                           marginBottom: '1rem'
                       }}
                       placeholder="Введите название галереи..."/>
                <TextArea rows={4}
                          value={galleryDescription}
                          placeholder='Введите описание галереи...'
                          style={{
                              marginBottom: '1rem'
                          }}
                          onChange={(e) => setGalleryDescription(e.target.value)}/>
                <Upload multiple
                        accept=".png,.jpg,.jpeg"
                        key={imageUploadKey}
                        listType='picture'
                        onChange={(images) => setImage(images.fileList.map((image) => image.originFileObj))}
                        beforeUpload={() => false}>
                    <Button icon={<UploadOutlined/>}>
                        Выберите изображения
                    </Button>
                </Upload>
            </Modal>
        </>
    );
};

export default GalleryModal;
