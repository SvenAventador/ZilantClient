import React from 'react';
import {Button, Input, Modal, notification} from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import {useNews} from "../../../store/NewsStore";
import {UploadOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";

const AdminNewsModal = (props) => {
    const {
        open,
        news,
        onOk,
        onCancel
    } = props
    const url = process.env.REACT_APP_API_PATH

    const [api, contextHolder] = notification.useNotification()

    const [newsTitle, setNewsTitle] = React.useState(news?.newsTitle || '')
    const [newsView, setNewsView] = React.useState(news?.newsView || '')
    const [fileList, setFileList] = React.useState([]);

    React.useEffect(() => {
        if (news) {
            setNewsTitle(news?.newsTitle)
            setNewsView(news?.newsView)
            setFileList(news.newsImage ? [{
                uid: '-1',
                name: 'Изображение новости',
                status: 'done',
                url: `${url}/${news.newsImage}`
            }] : []);
        } else {
            setNewsView('')
            setNewsView('')
            setFileList([])
        }
    }, [news])

    const handleUpload = ({file}) => {
        setFileList([file]);
        return false;
    };

    let {
        createNews,
        updateNews
    } = useNews()

    const addNews = () => {
        if (!newsTitle) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите заголовок новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!newsView) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите описание новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!fileList) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, выберите изображение!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const formData = new FormData()
        formData.append('newsTitle', newsTitle)
        formData.append('newsView', newsView)
        formData.append("newsImage", fileList[0])

        createNews(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Новость успешно создана!'
            }).then(() => {
                onOk()
                clearData()
            })
        }).catch((error) => {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    const refreshNews = () => {
        if (!newsTitle) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите заголовок новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!newsView) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите описание новости!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!fileList) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, выберите изображение!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const formData = new FormData()
        formData.append('newsTitle', newsTitle)
        formData.append('newsView', newsView)
        formData.append("newsImage", fileList[0])

        updateNews(news.id, formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Новость успешно обновлена!'
            }).then(() => {
                onOk()
                clearData()
            })
        }).catch((error) => {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    const clearData = () => {
        setNewsTitle('')
        setNewsView('')
        setFileList([])
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!news ? 'Добавить новость' : 'Изменить новость'}
                   onOk={onOk}
                   onCancel={onCancel}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button type={"primary"}
                               key='cancel'
                               onClick={() => {
                                   onCancel()
                               }}>
                           Отмена
                       </Button>,
                       <Button style={{
                           background: 'green',
                           color: 'white'
                       }}
                               key='ok'
                               onClick={() => {
                                   if (!news)
                                       addNews()
                                   else
                                       refreshNews()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={newsTitle}
                       onChange={(e) => setNewsTitle(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите заголовок новости..."
                />

                <TextArea value={newsView}
                          onChange={(e) => setNewsView(e.target.value)}
                          style={{marginBottom: '1rem'}}
                          rows={5}
                          placeholder="Введите описание новости..."
                />
                <Upload customRequest={handleUpload}
                        fileList={fileList}
                        maxCount={1}
                        listType="picture">
                    <Button icon={<UploadOutlined/>}>
                        Выбрать изображение (максимум 1)
                    </Button>
                </Upload>
            </Modal>
        </>
    );
};

export default AdminNewsModal;
