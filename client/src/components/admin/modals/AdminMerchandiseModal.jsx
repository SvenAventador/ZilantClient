import React from 'react';
import {Button, Input, Modal, notification} from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import {useNews} from "../../../store/NewsStore";
import {UploadOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";
import {useMerchandise} from "../../../store/MerchandiseStore";

const AdminMerchandiseModal = (props) => {
    const {
        open,
        merch,
        onOk,
        onCancel
    } = props
    const url = process.env.REACT_APP_API_PATH

    const [api, contextHolder] = notification.useNotification()

    const [merchandiseName, setMerchandiseName] = React.useState(merch?.merchandiseName || '')
    const [merchandiseDescription, setMerchandiseDescription] = React.useState(merch?.merchandiseDescription || '')
    const [merchandiseAmount, setMerchandiseAmount] = React.useState(merch?.merchandiseAmount || 0);
    const [merchandisePrice, setMerchandisePrice] = React.useState(merch?.merchandisePrice || 0)
    const [merchandiseImage, setMerchandiseImage] = React.useState([])

    React.useEffect(() => {
        if (merch) {
            setMerchandiseName(merch?.merchandiseName)
            setMerchandiseDescription(merch?.merchandiseDescription)
            setMerchandiseAmount(merch?.merchandiseAmount)
            setMerchandisePrice(merch?.merchandisePrice)
            setMerchandiseImage(merch.merchandiseImage ? [{
                uid: '-1',
                name: 'Изображение новости',
                status: 'done',
                url: `${url}/${merch.merchandiseImage}`
            }] : []);
        } else {
            setMerchandiseName('')
            setMerchandiseDescription('')
            setMerchandiseAmount(0)
            setMerchandisePrice(0)
            setMerchandiseImage([])
        }
    }, [merch])

    const handleUpload = ({file}) => {
        setMerchandiseImage([file]);
        return false;
    };

    let {
        createMerch,
        updateMerch
    } = useMerchandise()

    const addMerch = () => {
        const formData = new FormData()
        formData.append('merchandiseName', merchandiseName)
        formData.append('merchandiseDescription', merchandiseDescription)
        formData.append("merchandiseAmount", merchandiseAmount)
        formData.append('merchandisePrice', merchandisePrice)
        formData.append('merchandiseImage', merchandiseImage[0])

        createMerch(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Мерч успешно создан!'
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

    const refreshMerch = () => {
        const formData = new FormData()
        formData.append('merchandiseName', merchandiseName)
        formData.append('merchandiseDescription', merchandiseDescription)
        formData.append("merchandiseAmount", merchandiseAmount)
        formData.append('merchandisePrice', merchandisePrice)
        formData.append('merchandiseImage', merchandiseImage[0])

        updateMerch(merch.id, formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Мерч успешно обновлен!'
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
        setMerchandiseName('')
        setMerchandiseDescription('')
        setMerchandiseAmount(0)
        setMerchandisePrice(0)
        setMerchandiseImage([])
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!merch ? 'Добавить мерч' : 'Изменить мерч'}
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
                                   if (!merch)
                                       addMerch()
                                   else
                                       refreshMerch()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={merchandiseName}
                       onChange={(e) => setMerchandiseName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название мерча..."
                />

                <TextArea value={merchandiseDescription}
                          onChange={(e) => setMerchandiseDescription(e.target.value)}
                          style={{marginBottom: '1rem'}}
                          rows={5}
                          placeholder="Введите описание мерча..."
                />

                <Input value={merchandiseAmount}
                       onChange={(e) => {
                           const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Удаляем все символы, кроме цифр
                           setMerchandiseAmount(onlyNumbers);
                       }}
                       maxLength={7}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите количество товара..."
                       prefix='шт'
                />

                <Input value={merchandisePrice}
                       onChange={(e) => {
                           const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Удаляем все символы, кроме цифр
                           setMerchandisePrice(onlyNumbers);
                       }}
                       maxLength={7}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите цену товара..."
                       prefix='₽'
                />


                <Upload customRequest={handleUpload}
                        fileList={merchandiseImage}
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

export default AdminMerchandiseModal;
