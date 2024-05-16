import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import {useMerchandise} from "../../../store/Merchandise";

const AdminMerchandise = (props) => {
    const [api, contextHolder] = notification.useNotification()
    const {
        open,
        oneMerch,
        closeModal
    } = props
    const {
        createMerch,
        updateMerch
    } = useMerchandise()

    const [merchandiseName, setMerchandiseName] = React.useState(oneMerch?.merchandiseName || '')
    const [merchandiseDescription, setMerchandiseDescription] = React.useState(oneMerch?.merchandiseDescription || '')
    const [merchandiseAmount, setMerchandiseAmount] = React.useState(oneMerch?.merchandiseAmount || 0);
    const [merchandisePrice, setMerchandisePrice] = React.useState(oneMerch?.merchandisePrice || 0)
    const [merchandiseImage, setMerchandiseImage] = React.useState([])

    React.useEffect(() => {
        if (oneMerch) {
            setMerchandiseName(oneMerch?.merchandiseName)
            setMerchandiseDescription(oneMerch?.merchandiseDescription)
            setMerchandiseAmount(oneMerch?.merchandiseAmount)
            setMerchandisePrice(oneMerch?.merchandisePrice)
            setMerchandiseImage(oneMerch.merchandiseImage ? [{
                uid: '-1',
                name: 'Изображение мерча',
                status: 'done',
                url: `${process.env.REACT_APP_API_PATH}/${oneMerch.merchandiseImage}`
            }] : [])
        } else {
            setMerchandiseName('')
            setMerchandiseDescription('')
            setMerchandiseAmount(0)
            setMerchandisePrice(0)
            setMerchandiseImage([])
        }
    }, [oneMerch])

    const handleUpload = ({file}) => {
        setMerchandiseImage([file])
        return false
    }

    const updateOrInsetClub = () => {
        if (!merchandiseName) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите название мерча!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!merchandiseDescription) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите описание мерча!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!merchandiseAmount || merchandiseAmount < 0) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите корректное количество мерча!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!merchandisePrice || merchandisePrice < 1000) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, введите корректную цену мерча (не менее 1000 рублей)!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const merch = new FormData()
        merch.append('merchandiseName', merchandiseName)
        merch.append('merchandiseDescription', merchandiseDescription)
        merch.append("merchandiseAmount", merchandiseAmount)
        merch.append('merchandisePrice', merchandisePrice)
        merch.append('merchandiseImage', merchandiseImage[0])

        if (oneMerch) {
            updateMerch(oneMerch.id, merch).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным обновлем мерча!',
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
            createMerch(merch).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением мерча!',
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
                   title={!oneMerch ? 'Добавить мерч' : 'Изменить мерч'}
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
                               onClick={updateOrInsetClub}>
                           Сохранить изменения
                       </Button>
                   ]}>

                <Input value={merchandiseName}
                       onChange={(e) => setMerchandiseName(e.target.value)}
                       style={{
                           marginBottom: '1rem'
                       }}
                       placeholder="Введите название мерча..."/>

                <TextArea value={merchandiseDescription}
                          onChange={(e) => setMerchandiseDescription(e.target.value)}
                          style={{
                              marginBottom: '1rem'
                          }}
                          rows={5}
                          placeholder="Введите описание мерча..."/>

                <Input value={merchandiseAmount}
                       onChange={(e) => {
                           const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
                           setMerchandiseAmount(onlyNumbers)
                       }}
                       maxLength={7}
                       style={{
                           marginBottom: '1rem'
                       }}
                       placeholder="Введите количество товара..."
                       prefix='шт'/>

                <Input value={merchandisePrice}
                       onChange={(e) => {
                           const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
                           setMerchandisePrice(onlyNumbers)
                       }}
                       maxLength={7}
                       style={{
                           marginBottom: '1rem'
                       }}
                       placeholder="Введите цену товара..."
                       prefix='₽'/>
                <Upload customRequest={handleUpload}
                        fileList={merchandiseImage}
                        maxCount={1}
                        accept=".png,.jpg,.jpeg"
                        listType="picture">
                    <Button icon={<UploadOutlined/>}>
                        Выбрать изображение (максимум 1)
                    </Button>
                </Upload>
            </Modal>
        </>
    );
};

export default AdminMerchandise;