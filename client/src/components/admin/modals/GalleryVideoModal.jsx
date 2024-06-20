import React from 'react';
import { Button, Input, Modal, notification, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useGallery } from "../../../store/Gallery";
import { create } from "../../../http/video";

const { TextArea } = Input;

const GalleryVideoModal = (props) => {
    const { open, closeModal } = props;
    const { createGallery } = useGallery();
    const [api, contextHolder] = notification.useNotification();

    const [galleryTitle, setGalleryTitle] = React.useState('');
    const [galleryDescription, setGalleryDescription] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [imageUploadKey, setImageUploadKey] = React.useState(Date.now());
    const [video, setVideo] = React.useState([]);
    const [videoUploadKey, setVideoUploadKey] = React.useState(Date.now());

    React.useEffect(() => {
        if (!open) {
            setGalleryTitle('');
            setGalleryDescription('');
            setImage(null);
            setImageUploadKey(Date.now());
            setVideo([]);
            setVideoUploadKey(Date.now());
        }
    }, [open]);

    const addGallery = () => {
        if (!galleryTitle) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите название галереи!',
                className: 'custom-class',
                style: { width: 600 }
            });
        }

        if (!galleryDescription) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите описание галереи!',
                className: 'custom-class',
                style: { width: 600 }
            });
        }

        if (!image) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, выберите изображение!',
                className: 'custom-class',
                style: { width: 600 }
            });
        }

        const gallery = new FormData();
        gallery.append('galleryTitle', galleryTitle);
        gallery.append('galleryDescription', galleryDescription);
        gallery.append('galleryImage', image);  // Correctly appending a single image

        video.forEach((videoFile) => {
            gallery.append('video', videoFile);
        });

        create(gallery).then(() => {
            api.success({
                message: 'Внимание!',
                description: 'Поздравляем с успешным добавлением галереи!',
                className: 'custom-class',
                style: { width: 600 }
            });

            closeModal();
        }).catch((error) => {
            return api.error({
                message: 'Внимание!',
                description: error.response.data.message,
                className: 'custom-class',
                style: { width: 600 }
            });
        });
    };

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={'Добавление галереи'}
                   onCancel={closeModal}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={closeModal}>
                           Отмена
                       </Button>,
                       <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={addGallery}>
                           Добавить
                       </Button>
                   ]}>
                <Input value={galleryTitle}
                       onChange={(e) => setGalleryTitle(e.target.value)}
                       style={{ marginBottom: '1rem' }}
                       placeholder="Введите название галереи..." />
                <TextArea rows={4}
                          value={galleryDescription}
                          placeholder='Введите описание галереи...'
                          style={{ marginBottom: '1rem' }}
                          onChange={(e) => setGalleryDescription(e.target.value)} />
                <div style={{ width: '100%', marginBottom: '20px' }}>
                    <Upload
                        accept=".png,.jpg,.jpeg"
                        key={imageUploadKey}
                        maxCount={1}
                        listType="picture-card"
                        onChange={(info) => setImage(info.fileList[0]?.originFileObj || null)}
                        beforeUpload={() => false}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Изображение</div>
                        </button>
                    </Upload>
                </div>
                <div style={{ width: '100%' }}>
                    <Upload
                        multiple
                        accept=".mp4,.mpeg4,.mov,.mkv,.avi"
                        key={videoUploadKey}
                        listType="picture-card"
                        onChange={(info) => setVideo(info.fileList.map((file) => file.originFileObj))}
                        beforeUpload={() => false}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Видео</div>
                        </button>
                    </Upload>
                </div>
            </Modal>
        </>
    );
};

export default GalleryVideoModal;