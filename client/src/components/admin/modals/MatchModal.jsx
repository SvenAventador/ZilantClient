import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Modal,
    notification,
    Select,
    TimePicker
} from "antd";
import {useMatch} from "../../../store/Match";
import {useClub} from "../../../store/Club";
import {useForm} from "antd/es/form/Form";
import moment from "moment";

const {Option} = Select

const MatchModal = (props) => {
    const [api, contextHolder] = notification.useNotification()
    const {
        open,
        closeModal,
        oneMatch
    } = props
    const {
        createMatch,
        updateMatch
    } = useMatch()
    const [form] = useForm()
    const {getAllClub} = useClub()
    const [clubs, setClubs] = React.useState([])

    React.useEffect(() => {
        getAllClub().then(({clubs}) => {
            setClubs(clubs)
        })
    }, [getAllClub])

    React.useEffect(() => {
        if (open && oneMatch) {
            const matchDate = moment(oneMatch.matchDate)
            const matchTime = moment(oneMatch.matchTime, 'HH:mm:ss')
            form.setFieldsValue({
                matchDate,
                matchTime,
                club: oneMatch.hockeyClubId
            })
        } else {
            form.setFieldsValue({
                matchDate: null,
                matchTime: null,
                club: clubs.length > 0 ? clubs[0].id : undefined
            })
        }
    }, [form, oneMatch, open, clubs])

    const updateOrInsertData = async () => {
        const values = await form.validateFields()

        const match = new FormData()
        match.append('matchDate', values.matchDate.format('YYYY-MM-DD'))
        match.append('matchTime', values.matchTime.format('HH:mm:ss'))
        match.append('hockeyClubId', values.club)

        if (oneMatch) {
            updateMatch(oneMatch.id, match).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным обновлением матча!',
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
            createMatch(match).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: 'Поздравляем с успешным добавлением матча!',
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
                   title={oneMatch ? 'Обновление матча' : 'Добавление матча'}>
                <Form form={form}
                      layout={"vertical"}
                      onFinish={updateOrInsertData}
                      autoComplete={"off"}>
                    <Form.Item label="Дата матча"
                               name="matchDate"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, выберите дату матча'
                                   }
                               ]}>
                        <DatePicker placeholder={"Пожалуйста, выберите дату матча..."}
                                    style={{
                                        width: '100%'
                                    }}/>
                    </Form.Item>

                    <Form.Item label="Время матча"
                               name="matchTime"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, выберите время матча'
                                   }
                               ]}>
                        <TimePicker placeholder={"Пожалуйста, выберите время матча..."}
                                    style={{
                                        width: '100%'
                                    }}/>
                    </Form.Item>

                    <Form.Item label="Выберите клуб"
                               name="club"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, выберите клуб'
                                   }
                               ]}>
                        <Select>
                            {clubs.map((club) => (
                                <Option key={club.id}
                                        value={club.id}>
                                    {club.clubName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{
                            width: '100%',
                            backgroundColor: 'green',
                            color: 'white'
                        }}
                                htmlType={"submit"}>
                            {oneMatch ? 'Обновить матч' : 'Добавить матч'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MatchModal;