import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table,
    Image
} from "antd";
import {usePlayer} from "../../store/Player";
import PlayerModal from "./modals/PlayerModal";
import {SearchOutlined} from "@ant-design/icons";

const Player = () => {
    const [api, contextHolder] = notification.useNotification()
    const {
        getAllPlayer,
        getOnePlayer,
        deleteAllPlayer,
        deleteOnePlayer
    } = usePlayer()

    const [players, setPlayers] = React.useState([])
    React.useEffect(() => {
        getAllPlayer().then(({players}) => {
            setPlayers(players)
        })
    }, [getAllPlayer])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Фамилия игрока',
            dataIndex: 'playerSurname',
            key: 'playerSurname',
        },
        {
            title: 'Имя игрока',
            dataIndex: 'playerName',
            key: 'playerName'
        },
        {
            title: 'Отчество игрока',
            dataIndex: 'playerPatronymic',
            key: 'playerPatronymic'
        },
        {
            title: 'Игровой номер',
            dataIndex: 'playerNumber',
            key: 'playerNumber'
        },
        {
            title: 'Позиция',
            dataIndex: 'playerPosition',
            key: 'playerPosition'
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
                            Изменить игрока
                        </Button>
                        <Popconfirm title="Вы уверены, что хотите удалить этого игрока?"
                                    onConfirm={() => confirmOnePlayer(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить игрока
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
        getAllPlayer().then(({players}) => {
            setPlayers(players)
        })
        setIsOpen(false)
    }

    const [onePlayer, setOnePlayer] = React.useState([])
    const showModal = (id) => {
        setIsOpen(true)
        if (id) {
            getOnePlayer(id).then(({candidate}) => {
                setOnePlayer(candidate)
            })
        } else {
            setOnePlayer(null)
        }
    }

    const confirmOnePlayer = (id) => {
        deleteOnePlayer(id).then(() => {
            getAllPlayer().then(({players}) => {
                setPlayers(players);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Игрок с номером ${id} успешно удален!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllPlayers = () => {
        deleteAllPlayer().then(() => {
            getAllPlayer().then(({players}) => {
                setPlayers(players);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши игроки успешно удалены!`,
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
                   dataSource={players.map((player) => ({
                           ...player, key: player.id
                       })
                   )}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <Image width={350}
                                      src={`${process.env.REACT_APP_API_PATH}/${record.playerImage}`}/>
                           )
                       },
                       rowExpandable: (record) => record.playerImage !== null
                   }}
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
                                       onClick={() => showModal(null)}>
                                   Добавить игрока
                               </Button>
                               <Popconfirm title="Вы уверены, что хотите удалить всех игроков?"
                                           onConfirm={confirmAllPlayers}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить всех игроков
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <PlayerModal open={isOpen}
                         onePlayer={onePlayer}
                         closeModal={closeModal}/>
        </>
    );
};

export default Player;