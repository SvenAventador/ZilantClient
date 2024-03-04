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
import {usePlayer} from "../../../store/PlayerStore";

const AdminPlayerModal = (props) => {
    const {
        open,
        player,
        onOk,
        onCancel
    } = props
    const url = process.env.REACT_APP_API_PATH

    const [api, contextHolder] = notification.useNotification()

    const [playerSurname, setPlayerSurname] = React.useState(player?.playerSurname || '')
    const [playerName, setPlayerName] = React.useState(player?.playerName || '')
    const [playerPatronymic, setPlayerPatronymic] = React.useState(player?.playerPatronymic || '')
    const [playerNumber, setPlayerNumber] = React.useState(player?.playerNumber || 0)
    const [playerPosition, setPlayerPosition] = React.useState(player?.playerPosition || '')
    const [fileList, setFileList] = React.useState([]);

    React.useEffect(() => {
        if (player) {
            setPlayerSurname(player?.playerSurname)
            setPlayerName(player?.playerName)
            setPlayerPatronymic(player?.playerPatronymic)
            setPlayerNumber(player?.playerNumber)
            setPlayerPosition(player?.playerPosition)
            setFileList(player?.playerImage ? [{
                uid: '-1',
                name: 'Изображение клуба',
                status: 'done',
                url: `${url}${player.playerImage}`
            }] : []);
        } else {
            setPlayerSurname('')
            setPlayerName('')
            setPlayerPatronymic('')
            setPlayerNumber('')
            setPlayerPosition('')
            setFileList([])
        }
    }, [player])

    const handleUpload = ({file}) => {
        setFileList([file]);
        return false;
    };

    let {
        createPlayer,
        updatePlayer
    } = usePlayer()

    const addClub = () => {
        const formData = new FormData()
        formData.append('playerSurname', playerSurname)
        formData.append("playerName", playerName)
        formData.append('playerPatronymic', playerPatronymic)
        formData.append("playerNumber", playerNumber)
        formData.append('playerPosition', playerPosition)
        formData.append("playerImage", fileList[0])
        createPlayer(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Игрок успешно создан!'
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
        const formData = new FormData()
        formData.append('playerSurname', playerSurname)
        formData.append("playerName", playerName)
        formData.append('playerPatronymic', playerPatronymic)
        formData.append("playerNumber", playerNumber)
        formData.append('playerPosition', playerPosition)
        formData.append("playerImage", fileList[0])
        updatePlayer(player.id, formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Игрок успешно создан!'
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
        setPlayerSurname('')
        setPlayerName('')
        setPlayerPatronymic('')
        setPlayerNumber('')
        setPlayerPosition('')
        setFileList([])
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!player ? 'Добавить игрока' : 'Изменить игрока'}
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
                                   if (!player)
                                       addClub()
                                   else
                                       refreshClub()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>

                <Input value={playerSurname}
                       onChange={(e) => setPlayerSurname(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите фамилию игрока клуба..."
                />

                <Input value={playerName}
                       onChange={(e) => setPlayerName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите имя игрока клуба..."
                />

                <Input value={playerPatronymic}
                       onChange={(e) => setPlayerPatronymic(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите отчество игрока клуба..."
                />

                <Input value={playerNumber}
                       onChange={(e) => {
                           const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Удаляем все символы, кроме цифр
                           setPlayerNumber(onlyNumbers);
                       }}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите номер игрока клуба..."
                />

                <Input value={playerPosition}
                       onChange={(e) => setPlayerPosition(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите позицию игрока клуба..."
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

export default AdminPlayerModal;
