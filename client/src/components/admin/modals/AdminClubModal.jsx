import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification
} from "antd";
import Upload from "antd/es/upload/Upload";
import {UploadOutlined} from "@ant-design/icons";
import Swal from "sweetalert2";
import {useClub} from "../../../store/ClubStore";

const AdminClubModal = (props) => {
    const {
        open,
        club,
        onOk,
        onCancel
    } = props
    const url = process.env.REACT_APP_API_PATH

    const [api, contextHolder] = notification.useNotification()

    const [clubName, setClubName] = React.useState(club?.clubName || '')
    const [clubPoint, setClubPoint] = React.useState(club?.clubPoint || 0)
    const [fileList, setFileList] = React.useState([]);

    React.useEffect(() => {
        if (club) {
            setClubName(club?.clubName)
            setClubPoint(club?.clubPoint)
            setFileList(club.clubImage ? [{
                uid: '-1',
                name: 'Изображение клуба',
                status: 'done',
                url: `${url}${club.clubImage}`
            }] : []);
        } else {
            setClubName('')
            setClubPoint(0)
            setFileList([])
        }
    }, [club])

    const handleUpload = ({file}) => {
        setFileList([file]);
        return false;
    };

    let {
        createClub,
        updateClub
    } = useClub()

    const addClub = () => {
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
        formData.append('clubName', clubName)
        formData.append("clubImage", fileList[0])

        createClub(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Клуб успешно создана!'
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

    const refreshClub = () => {
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

        if (!clubPoint || +clubPoint < 0) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите корректное количество очков для клуба!',
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
        formData.append('clubName', clubName)
        formData.append('clubPoint', clubPoint)
        formData.append("clubImage", fileList[0])

        updateClub(club.id, formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Клуб успешно обновлен!'
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
        setClubName('')
        setClubPoint(0)
        setFileList([])
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!club ? 'Добавить клуб' : 'Изменить клуб'}
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
                                   if (!club)
                                       addClub()
                                   else
                                       refreshClub()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={clubName}
                       onChange={(e) => setClubName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название клуба..."
                />

                {
                    club && (
                        <Input value={clubPoint}
                               onChange={(e) => {
                                   const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                   setClubPoint(onlyNumbers);
                               }}
                               maxLength={7}
                               style={{marginBottom: '1rem'}}
                               placeholder="Введите количество товара..."
                               prefix='шт'
                        />
                    )
                }

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

export default AdminClubModal;
