import React from 'react';
import {
    Button,
    Image,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {useMatch} from "../../store/Match";
import {SearchOutlined} from "@ant-design/icons";
import MatchModal from "./modals/MatchModal";

const Match = () => {
    const [api, contextHolder] = notification.useNotification()
    const {
        getAllMatch,
        getOneMatch,
        deleteAllMatch,
        deleteOneMatch
    } = useMatch()

    const [matches, setMatches] = React.useState([])
    React.useEffect(() => {
        getAllMatch().then(({matches}) => {
            setMatches(matches)
        })
    }, [getAllMatch])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Дата матча',
            dataIndex: 'matchDate',
            key: 'matchDate',
            render: (text, record) => {
                return record.matchDate.substring(0, 10);
            }
        },
        {
            title: 'Время матча',
            dataIndex: 'matchTime',
            key: 'matchTime',
            render: (text, record) => {
                return record.matchTime.substring(0, 5)
            }
        },
        {
            title: 'Название клуба',
            dataIndex: ['hockey_club', 'clubName'],
            key: 'clubName'
        },
        {
            title: 'Изображение клуба',
            dataIndex: ['hockey_club', 'clubImage'],
            key: 'clubImage',
            render: (text, record) => (
                <Image src={`${process.env.REACT_APP_API_PATH}${record.hockey_club.clubImage}`}
                       alt="Изображение клуба"
                       style={{
                           maxWidth: '100px',
                           maxHeight: '100px'
                       }}/>
            )
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
                            background: 'orange',
                            color: 'white'
                        }}
                                onClick={() => showModal(record.id)}>
                            Изменить матч
                        </Button>
                        <Popconfirm title="Вы уверены, что хотите удалить этот матч?"
                                    onConfirm={() => confirmOneMatch(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить матч
                            </Button>
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
    )

    const [isOpen, setIsOpen] = React.useState(false)
    const closeModal = () => {
        getAllMatch().then(({matches}) => {
            setMatches(matches)
        })

        setIsOpen(false)
    }

    const [oneMatch, setOneMatch] = React.useState([])
    const showModal = (id) => {
        setIsOpen(true)
        if (id)
            getOneMatch(id).then(({match}) => {
                setOneMatch(match)
            })
        else
            setOneMatch(null)
    }
    const confirmOneMatch = (id) => {
        deleteOneMatch(id).then(() => {
            getAllMatch().then(({matches}) => {
                setMatches(matches);
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
                setMatches(matches);
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
                   dataSource={matches.map((matches) => ({
                           ...matches, key: matches.id
                       })
                   )}
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
                                       }}>
                                   Добавить матч
                               </Button>
                           </Space>
                       )
                   }}
            />
            <MatchModal open={isOpen}
                        oneMatch={oneMatch}
                        closeModal={closeModal}/>
        </>
    );
};

export default Match;