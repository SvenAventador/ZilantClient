import React from 'react';
import {
    Button, DatePicker, Form, Input, Modal, notification, Select, TimePicker
} from "antd";
import {useMatch} from "../../../store/Match";
import {useClub} from "../../../store/Club";
import {useForm} from "antd/es/form/Form";
import moment from "moment";

const {Option} = Select

const MatchModal = (props) => {
    const [api, contextHolder] = notification.useNotification()
    const {
        open, closeModal, oneMatch
    } = props
    const {
        createMatch, updateMatch
    } = useMatch()
    const [form] = useForm()
    const {getAllClub, getOneClub} = useClub()
    const [clubs, setClubs] = React.useState([])
    const [zilant, setZilant] = React.useState([])
    const [otherClub, setOtherClub] = React.useState([])

    const icePlaces = ["ЛД «Зилант»", "ЛД «Баско»", "ЛД «Форвард»", "ЛД «Татнефть Арена» малая", "ЛД «Татнефть Арена» основная", "СК «Ватан»", "ЛД «Золотая шайба»", "СК «Триумф»", "ЛД «Ак буре»"];

    React.useEffect(() => {
        getAllClub().then(({clubs}) => {
            const filteredClubs = clubs.filter(club => club.id !== 1)
            const zilantClub = clubs.filter(club => club.id === 1)
            setClubs(filteredClubs)
            setZilant(zilantClub)
        })
    }, [getAllClub])

    React.useEffect(() => {
        if (open && oneMatch) {
            getOneClub(oneMatch?.hockeyClubId).then((response) => {
                if (response.club) {
                    setOtherClub(response.club);
                }
            });
        }
    }, [getOneClub, oneMatch, open])

    React.useEffect(() => {
        if (open && oneMatch) {
            const matchDate = moment(oneMatch.matchDate)
            const matchTime = moment(oneMatch.matchTime, 'HH:mm:ss')
            form.setFieldsValue({
                matchDate, matchTime, club: oneMatch.hockeyClubId, icePlace: oneMatch.icePlace
            })
        } else {
            form.setFieldsValue({
                matchDate: null,
                matchTime: null,
                club: clubs.length > 0 ? clubs[0].id : undefined,
                icePlace: icePlaces[0]
            })
        }
    }, [form, oneMatch, open, clubs, icePlaces])

    const updateOrInsertData = async () => {
        const values = await form.validateFields()

        const match = new FormData()
        !oneMatch && match.append('matchDate', values.matchDate.format('YYYY-MM-DD'))
        !oneMatch && match.append('matchTime', values.matchTime.format('HH:mm:ss'))
        !oneMatch && match.append('icePlace', values.icePlace)
        !oneMatch ? match.append('hockeyClubId', values.club) : match.append('hockeyClubId', oneMatch?.hockeyClubId)

        if (values.zilantGoals === values.otherGoals)
            return api.error({
                message: 'Внимание!',
                description: 'В хоккее матч не может закончится с одинаковым счетом!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })

        let gameScore
        if (parseInt(values.zilantGoals) > parseInt(values.otherGoals) && parseInt(values.outcome) === 1)
            gameScore = `${values.zilantGoals}:${values.otherGoals}`
        if (parseInt(values.zilantGoals) > parseInt(values.otherGoals) && parseInt(values.outcome) === 2)
            gameScore = `${values.zilantGoals}Б:${values.otherGoals}`
        if (parseInt(values.zilantGoals) > parseInt(values.otherGoals) && parseInt(values.outcome) === 3)
            gameScore = `${values.zilantGoals}О:${values.otherGoals}`

        if (parseInt(values.zilantGoals) < parseInt(values.otherGoals) && parseInt(values.outcome) === 1)
            gameScore = `${values.zilantGoals}:${values.otherGoals}`
        if (parseInt(values.zilantGoals) < parseInt(values.otherGoals) && parseInt(values.outcome) === 2)
            gameScore = `${values.zilantGoals}:${values.otherGoals}Б`
        if (parseInt(values.zilantGoals) < parseInt(values.otherGoals) && parseInt(values.outcome) === 3)
            gameScore = `${values.zilantGoals}:${values.otherGoals}О`

        oneMatch && match.append('gameScore', gameScore)
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
                    message: 'Внимание!', description: error.response.data.message, className: 'custom-class', style: {
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
                    message: 'Внимание!', description: error.response.data.message, className: 'custom-class', style: {
                        width: 600
                    }
                })
            })
        }
    }

    return (<>
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
                {open && !oneMatch ? (<>
                    <Form.Item label="Дата матча"
                               name="matchDate"
                               rules={[{
                                   required: true, message: 'Пожалуйста, выберите дату матча'
                               }]}>
                        <DatePicker placeholder={"Пожалуйста, выберите дату матча..."}
                                    style={{
                                        width: '100%'
                                    }}/>
                    </Form.Item>

                    <Form.Item label="Время матча"
                               name="matchTime"
                               rules={[{
                                   required: true, message: 'Пожалуйста, выберите время матча'
                               }]}>
                        <TimePicker placeholder={"Пожалуйста, выберите время матча..."}
                                    style={{
                                        width: '100%'
                                    }}/>
                    </Form.Item>

                    <Form.Item label="Выберите клуб"
                               name="club"
                               rules={[{
                                   required: true, message: 'Пожалуйста, выберите клуб'
                               }]}>
                        <Select>
                            {clubs.map((club) => (<Option key={club.id}
                                                          value={club.id}>
                                {club.clubName}
                            </Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Выберите место проведения матча"
                               name="icePlace"
                               rules={[{
                                   required: true, message: 'Пожалуйста, выберите место проведения матча'
                               }]}>
                        <Select>
                            {icePlaces.map((place, index) => (<Option key={index}
                                                                      value={place}>
                                {place}
                            </Option>))}
                        </Select>
                    </Form.Item>
                </>) : (

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexFlow: "column",
                        }}>
                            {zilant && (<>
                                <img src={process.env.REACT_APP_API_PATH + zilant.clubImage}
                                     alt=""
                                     style={{
                                         width: '150px', height: '150px',
                                     }}/>
                                <Form.Item name="zilantGoals">
                                    <Input placeholder="Голы Зиланта"/>
                                </Form.Item>
                            </>)}
                        </div>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexFlow: "column",
                        }}>
                            {otherClub && (<>
                                <img src={process.env.REACT_APP_API_PATH + otherClub.clubImage}
                                     alt=""
                                     style={{
                                         width: '150px', height: '150px',
                                     }}/>
                                <Form.Item name="otherGoals">
                                    <Input placeholder="Голы соперника"/>
                                </Form.Item>
                            </>)}
                        </div>


                    </div>)}

                {
                    oneMatch && (
                        <Form.Item name="outcome">
                            <Select placeholder="Выберите результат" defaultValue="1">
                                <Option value="1">Победа в основное время</Option>
                                <Option value="2">Победа по Буллитам</Option>
                                <Option value="3">Победа в Овертайме</Option>
                            </Select>
                        </Form.Item>
                    )
                }


                <Form.Item>
                    <Button style={{
                        width: '100%', backgroundColor: 'green', color: 'white'
                    }}
                            htmlType={"submit"}>
                        {oneMatch ? 'Обновить матч' : 'Добавить матч'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>);
};

export default MatchModal;