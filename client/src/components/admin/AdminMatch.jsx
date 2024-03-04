import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useMatch} from "../../store/MatchStore";
import {getOneMatch} from "../../http/matchApi";
import AdminMatchModal from "./modals/AdminMatchModal";

const AdminMatch = () => {
    const [api, contextHolder] = notification.useNotification()
    let {
        getAllMatch,
        deleteOneMatch,
        deleteAllMatch
    } = useMatch()
    const [match, setMatch] = React.useState([])
    React.useEffect(() => {
        getAllMatch().then(({matches}) => {
            console.log(matches)
            setMatch(matches)
        })
    }, [getAllMatch])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Дата матча',
            dataIndex: 'matchDate',
            key: 'matchDate'
        },
        {
            title: 'Время матча',
            dataIndex: 'matchTime',
            key: 'matchTime'
        },
        {
            title: 'Название клуба',
            dataIndex: ['hockey_club', 'clubName'],
            key: 'clubName'
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Button style={{
                            background: 'green',
                            color: 'white'
                        }}
                                onClick={() => {
                                    return showModal(record.id)
                                }}>
                            Изменить матч
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этот матч?"
                            onConfirm={() => confirmOneMatch(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить матч</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const customEmptyText = (
        <div>
            <SearchOutlined style={{
                fontSize: 24,
                color: '#999'
            }}/>
            <p>Пустоватенько...</p>
        </div>
    );

    const [isOpen, setIsOpen] = React.useState(false)
    const handleOk = () => {
        getAllMatch().then(({matches}) => {
            setMatch(matches)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [oneMatch, setOneMatch] = React.useState([])
    const showModal = (record) => {
        setIsOpen(true)
        if (record)
            getOneMatch(record).then(({candidate}) => {
                setOneMatch(candidate)
            })
        else
            setMatch(null)
    }

    const confirmOneMatch = (id) => {
        deleteOneMatch(id).then(() => {
            getAllMatch().then(({matches}) => {
                setMatch(matches);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Матч с номером ${id} успешно удален!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        }).catch((error) => {
            return api.error({
                message: 'Внимание! Тут ошибочка!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    const confirmAllMatch = () => {
        deleteAllMatch().then(() => {
            getAllMatch().then(({matches}) => {
                setMatch(matches);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши матчи успешно удалены!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }


    return (
        <>
            {contextHolder}
            <Table columns={column}
                   dataSource={match ? match.map((matches) => ({...matches, key: matches.id})) : []} // Добавлена проверка на null
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   title={() => {
                       return (
                           <Space size="large">
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => {
                                           showModal(null)
                                       }}>Добавить новость</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить все матчи?"
                                   onConfirm={() => {
                                       confirmAllMatch()
                                   }}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить все матчи</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminMatchModal open={isOpen}
                             match={oneMatch}
                             onOk={handleOk}
                             onCancel={handleCancel}/>
        </>
    );
};

export default AdminMatch;
