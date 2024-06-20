import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import {useClub} from "../../../store/Club";
import {UploadOutlined} from "@ant-design/icons";

const ClubModal = (props) => {
    const {
        open,
        oneClub,
        closeModal
    } = props
    const {
        createClub,
        updateClub
    } = useClub()
    const [api, contextHolder] = notification.useNotification()

    const [clubName, setClubName] = React.useState(oneClub?.clubName || '')
    const [clubPoint, setClubPoint] = React.useState(oneClub?.clubPoint || 0)

    const [fileList, setFileList] = React.useState([])
    const handleUpload = ({file}) => {
        setFileList([file])
        return false
    }

    React.useEffect(() => {
        if (oneClub) {
            setClubName(oneClub?.clubName)
            setClubPoint(oneClub?.clubPoint)
            setFileList(oneClub.clubImage ? [{
                uid: '-1',
                name: 'Изображение клуба',
                status: 'done',
                url: `${process.env.REACT_APP_API_PATH}${oneClub.clubImage}`
            }] : []);
        } else {
            setClubName('')
            setClubPoint(0)
            setFileList([])
        }
    }, [oneClub])

    const clearData = () => {
        setClubName('')
        setClubPoint(0)
        setFileList([])
        closeModal()
    }

    const updateOrInsertRecord = () => {
        if (!clubName) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите название клуба!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }
        if (oneClub && clubPoint < 0) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите корректное количество очков ждя клуба!',
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

        const club = new FormData()
        club.append('clubName', clubName)
        club.append('clubImage', fileList[0])

        if (oneClub) {
            updateClub(oneClub.id, club).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным обновлением записи!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })

                clearData()
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
        } else {
            createClub(club).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением записи!',
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })

                clearData()
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
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={oneClub ? 'Изменение клуба' : 'Добавление клуба'}
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
                               onClick={updateOrInsertRecord}>
                           Сохранить
                       </Button>
                   ]}>
                <Input value={clubName}
                       onChange={(e) => {
                           if (!/\d/.test(e.target.value)) {
                               setClubName(e.target.value);
                           }
                       }}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название клуба..."
                />
                <Upload customRequest={handleUpload}
                        fileList={fileList}
                        maxCount={1}
                        accept=".jpg, .jpeg, .png"
                        listType="picture">
                    <Button icon={<UploadOutlined/>}>
                        Выбрать изображение (максимум 1)
                    </Button>
                </Upload>
            </Modal>
        </>
    );
};

export default ClubModal;