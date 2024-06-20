import React from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import {useForm} from "antd/es/form/Form";
import {UploadOutlined} from "@ant-design/icons";
import {
    create,
    edit
} from "../../../http/personal";

const PersonalModal = (props) => {
    const {
        open,
        closeModal,
        onePlayer
    } = props

    const [api, contextHolder] = notification.useNotification()
    const [form] = useForm()
    const [playerImage, setPlayerImage] = React.useState([])

    React.useEffect(() => {
        if (!open && !onePlayer) {
            form.setFieldsValue({
                personSurname: '',
                personName: '',
                personPatronymic: '',
                personPosition: ''
            })

            setPlayerImage([])
        }
    }, [form, open, onePlayer])

    React.useEffect(() => {
        if (open && onePlayer) {
            form.setFieldsValue({
                personSurname: onePlayer.personSurname,
                personName: onePlayer.personName,
                personPatronymic: onePlayer.personPatronymic,
                personPosition: onePlayer.personPosition
            })

            if (onePlayer.personImage && playerImage.length === 0) {
                setPlayerImage([
                    {
                        uid: '-1',
                        name: onePlayer.personImage,
                        status: 'done',
                        url: `${process.env.REACT_APP_API_PATH}${onePlayer.personImage}`
                    }
                ])
            } else {
                form.setFieldsValue({
                    personSurname: '',
                    personName: '',
                    personPatronymic: '',
                    personPosition: ''
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
        player.append('personSurname', values.playerSurname)
        player.append('personName', values.playerName)
        player.append('personPatronymic', values.playerPatronymic)
        player.append('personPosition', values.playerPosition)
        player.append('personImage', playerImage[0])

        if (onePlayer) {
            edit(onePlayer.id, player).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным изменением руководителя!',
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
            create(player).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением руководителя!',
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
                   title={onePlayer ? 'Редактирование руководителя' : 'Добавление руководителя'}>
                <Form form={form}
                      layout={"vertical"}
                      onFinish={updateOrInsetData}
                      autoComplete={"off"}>
                    <Form.Item label='Фамилия руководителя'
                               name='playerSurname'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите фамилию руководителя!'
                                   }
                               ]}>
                        <Input placeholder='Введите фамилию руководителя клуба...'/>
                    </Form.Item>

                    <Form.Item label='Имя руководителя'
                               name='playerName'
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите имя руководителя!'
                                   }
                               ]}>
                        <Input placeholder='Введите имя руководителя клуба...'/>
                    </Form.Item>

                    <Form.Item label='Отчество руководителя'
                               name='playerPatronymic'>
                        <Input placeholder='Введите отчество руководителя клуба...'/>
                    </Form.Item>

                    <Form.Item label='Должность руководителя'
                               name='playerPosition'>
                        <Input type='text'
                               placeholder='Введите должность руководителя клуба...'/>
                    </Form.Item>

                    <Form.Item label='Изображение руководителя'
                               name='personImage'>
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

export default PersonalModal;