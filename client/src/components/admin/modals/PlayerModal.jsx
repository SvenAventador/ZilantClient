import React from 'react';
import {usePlayer} from "../../../store/Player";
import {Button, Form, Input, Modal, notification, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";

const {Option} = Select

const PlayerModal = (props) => {
    const {
        open,
        closeModal,
        onePlayer
    } = props
    const {
        createPlayer,
        updatePlayer
    } = usePlayer()

    const [api, contextHolder] = notification.useNotification()
    const [form] = useForm()
    const [playerImage, setPlayerImage] = React.useState([])

    React.useEffect(() => {
        if (!open && !onePlayer) {
            form.setFieldsValue({
                playerSurname: '',
                playerName: '',
                playerPatronymic: '',
                playerNumber: '',
                playerPosition: 'Нападающий'
            })

            setPlayerImage([])
        }
    }, [form, open, onePlayer])

    React.useEffect(() => {
        if (open && onePlayer) {
            form.setFieldsValue({
                playerSurname: onePlayer.playerSurname,
                playerName: onePlayer.playerName,
                playerPatronymic: onePlayer.playerPatronymic,
                playerNumber: onePlayer.playerNumber,
                playerPosition: onePlayer.playerPosition
            })

            if (onePlayer.playerImage && playerImage.length === 0) {
                setPlayerImage([
                    {
                        uid: '-1',
                        name: onePlayer.playerImage,
                        status: 'done',
                        url: `${process.env.REACT_APP_API_PATH}${onePlayer.playerImage}`
                    }
                ])
            } else {
                form.setFieldsValue({
                    playerSurname: '',
                    playerName: '',
                    playerPatronymic: '',
                    playerNumber: '',
                    playerPosition: 'Нападающий'
                })

                setPlayerImage([])
            }
        }
    }, [form, onePlayer, open])

    const handleUpload = ({file}) => {
        setPlayerImage([file])
        return false
    }

    const updateOrInsetData = async () => {
        const values = await form.validateFields()
        if (!playerImage.length) {
            return api.error({
                message: 'Внимание!',
                description: 'Пожалуйста, выберите изображение',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const player = new FormData()
        player.append('playerSurname', values.playerSurname)
        player.append('playerName', values.playerName)
        player.append('playerPatronymic', values.playerPatronymic)
        player.append('playerNumber', values.playerNumber)
        player.append('playerPosition', values.playerPosition)
        player.append('playerImage', playerImage[0])

        if (onePlayer) {
            updatePlayer(onePlayer.id, player).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным изменением игрока!',
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
            createPlayer(player).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением игрока!',
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
                   onCancel={closeModal}
                   footer={[]}
                   centered
                   maskClosable={false}
                   title={onePlayer ? 'Редактирование игрока' : 'Добавление игрока'}>
                <Form form={form}
                      layout={"vertical"}
                      onFinish={updateOrInsetData}
                      autoComplete={"off"}>
                    <Form.Item label='Фамилия игрока'
                               name='playerSurname'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите фамилию игрока!'
                                   }
                               ]}>
                        <Input placeholder='Введите фамилию игрока клуба...'/>
                    </Form.Item>

                    <Form.Item label='Имя игрока'
                               name='playerName'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите имя игрока!'
                                   }
                               ]}>
                        <Input placeholder='Введите имя игрока клуба...'/>
                    </Form.Item>

                    <Form.Item label='Отчество игрока'
                               name='playerPatronymic'>
                        <Input placeholder='Введите отчество игрока клуба...'/>
                    </Form.Item>

                    <Form.Item label='Номер игрока'
                               name='playerNumber'>
                        <Input type='number'
                               placeholder='Введите номер игрока клуба...'/>
                    </Form.Item>

                    <Form.Item label='Позиция игрока'
                               name='playerPosition'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите позицию игрока!'
                                   }
                               ]}>
                        <Select defaultValue='Нападающий'>
                            <Option value={"Нападающий"}>
                                Нападающий
                            </Option>
                            <Option value={"Защитник"}>
                                Защитник
                            </Option>
                            <Option value={"Вратарь"}>
                                Вратарь
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='Изображение игрока'
                               name='playerImage'>
                        <Upload customRequest={handleUpload}
                                fileList={playerImage}
                                maxCount={1}
                                accept='.png,.jpg,.jpeg'
                                listType='picture'>
                            <Button icon={<UploadOutlined/>}>
                                Выбрать изображение (максимум 1)
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType={"submit"}
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    width: '100%'
                                }}>
                            {onePlayer ? 'Обновить данные' : 'Добавить данные'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PlayerModal;