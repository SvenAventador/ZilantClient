import React from 'react';
import {
    Button, Form,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useNews} from "../../../store/News";

const NewsModal = (props) => {
    const [api, contextHolder] = notification.useNotification()
    const {
        open,
        closeModal,
        oneNews
    } = props
    const {
        createNews,
        updateNews
    } = useNews()

    const [newsTitle, setNewsTitle] = React.useState(oneNews?.newsTitle || '')
    const [newsImage, setNewsImage] = React.useState([])
    const [newsChapter, setNewsChapter] = React.useState([])

    const handleAddContent = () => {
        setNewsChapter([...newsChapter, {newsChapter: ''}])
    }

    const handleRemoveContent = (index) => {
        const updatedContent = newsChapter.filter((_, i) => i !== index)
        setNewsChapter(updatedContent)
    }

    const handleChangeContent = (index, value) => {
        const updatedContent = [...newsChapter]
        updatedContent[index].newsChapter = value
        setNewsChapter(updatedContent)
    }

    React.useEffect(() => {
        if (oneNews) {
            setNewsTitle(oneNews?.newsTitle)
            setNewsImage(oneNews.newsImage ? [{
                uid: '-1',
                name: 'Изображение новости',
                status: 'done',
                url: `${process.env.REACT_APP_API_PATH}/${oneNews.newsImage}`
            }] : [])
        } else {
            setNewsTitle('')
            setNewsImage([])
        }
    }, [oneNews])

    const handleUpload = ({file}) => {
        setNewsImage([file])
        return false
    }

    React.useEffect(() => {
        if (!open) {
            setNewsTitle('')
            setNewsImage([])
            setNewsChapter([]);
        }
    }, [open])

    const insertOrUpdateNews = () => {
        if (!newsTitle) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите заголовок новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!newsImage.length) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, выберите изображение!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!oneNews && !newsChapter.length) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, добавьте хоть один абзац для новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!oneNews && newsChapter.some(content => !content.newsChapter)) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, заполните все поля для  предназначенные для абзацев!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const news = new FormData()
        news.append('newsTitle', newsTitle)
        news.append('newsImage', newsImage[0])
        !oneNews && news.append('newsContent', JSON.stringify(newsChapter))

        if (oneNews) {
            updateNews(oneNews.id, news).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным обновлением новости!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })

                closeModal()
            }).catch((error) => {
                api.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        } else {
            createNews(news).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением новости!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })

                closeModal()
            }).catch((error) => {
                api.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        }
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!oneNews ? 'Добавить новость' : 'Изменить новость'}
                   onCancel={closeModal}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button style={{
                           backgroundColor: 'red',
                           color: 'white'
                       }}
                               key='cancel'
                               onClick={closeModal}>
                           Отмена
                       </Button>,
                       <Button style={{
                           background: 'green',
                           color: 'white'
                       }}
                               key='ok'
                               onClick={insertOrUpdateNews}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={newsTitle}
                       onChange={(e) => setNewsTitle(e.target.value)}
                       style={{
                           marginBottom: '1rem'
                       }}
                       placeholder="Введите заголовок новости..."/>
                <Upload customRequest={handleUpload}
                        fileList={newsImage}
                        maxCount={1}
                        style={{
                            marginBottom: '1rem'
                        }}
                        accept=".png,.jpg,.jpeg"
                        listType="picture">
                    <Button icon={<UploadOutlined/>}>
                        Выбрать изображение (максимум 1)
                    </Button>
                </Upload>
                {!oneNews && newsChapter.map((content, index) => (
                    <React.Fragment key={index}>
                        <Form.Item label={`Абзац №${index + 1}`}
                                   style={{
                                       marginTop: '.5rem',
                                       marginBottom: '.5rem'
                                   }}>
                            <Input value={content.newsChapter}
                                   placeholder="Введите данные абзаца..."
                                   onChange={e => handleChangeContent(index, e.target.value)}
                                   addonAfter={
                                       <Button type={'link'}
                                               danger
                                               onClick={() => handleRemoveContent(index)}>
                                           Удалить
                                       </Button>
                                   }
                            />
                        </Form.Item>
                    </React.Fragment>
                ))}
                {
                    !oneNews && (
                        <Button onClick={handleAddContent}
                                style={{
                                    width: '100%',
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    marginTop: '1rem'
                                }}>
                            Добавить новый раздел
                        </Button>
                    )
                }
            </Modal>
        </>
    );
};

export default NewsModal;