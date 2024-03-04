import React from 'react';
import {
    Button,
    DatePicker,
    Modal,
    notification, TimePicker
} from "antd";
import {useMatch} from "../../../store/MatchStore";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';


const AdminMatchModal = (props) => {
    const {
        open,
        match,
        onOk,
        onCancel
    } = props

    console.log(match)
    const url = process.env.REACT_APP_API_PATH

    const [api, contextHolder] = notification.useNotification()

    const [matchDate, setMatchDate] = React.useState(match?.matchDate || '')
    const [matchTime, setMatchTime] = React.useState(match?.matchTime || '')
    const [clubId, setClubId] = React.useState(match?.hockeyClubId || 1)

    React.useEffect(() => {
        if (match) {
            setMatchDate(match?.matchDate)
            setMatchTime(match?.matchTime)
            setClubId(match?.hockeyClubId)
        } else {
            setMatchDate('')
            setMatchTime('')
            setClubId(1)
        }
    }, [match])


    let {
        createClub,
        updateClub
    } = useMatch()

    const addMatch = () => {

    }

    const refreshMatch = () => {

    }

    const clearData = () => {
        setMatchDate('')
        setMatchTime('')
        setClubId(1)
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    dayjs.extend(customParseFormat);
    const onChangeTime = (time, timeString) => {
        console.log(time, timeString);
    };

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!match ? 'Добавить матч' : 'Изменить матч'}
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
                                   if (!match)
                                       addMatch()
                                   else
                                       refreshMatch()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <DatePicker onChange={onChange} />
                <TimePicker onChange={onChangeTime}
                            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Modal>
        </>
    );
};

export default AdminMatchModal;
