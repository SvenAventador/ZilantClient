import React from 'react';
import {
    Button,
    Image,
    Input,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {usePlayer} from "../../store/PlayerStore";
import {getOnePlayer} from "../../http/playerApi";
import AdminPlayerModal from "./modals/AdminPlayerModal";

const AdminPlayer = () => {
    const [api, contextHolder] = notification.useNotification()

    let {
        getAllPlayer,
        deleteOnePlayer,
        deleteAllPlayer
    } = usePlayer()
    const [player, setPlayer] = React.useState([])
    React.useEffect(() => {
        getAllPlayer().then(({players}) => {
            setPlayer(players)
        })
    }, [getAllPlayer])

    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const searchInput = React.useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{
                padding: 8,
            }}
                 onKeyDown={(e) => e.stopPropagation()}>
                <Input ref={searchInput}
                       placeholder={`Поиск по названию новостей`}
                       value={selectedKeys[0]}
                       onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                       onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                       style={{
                           marginBottom: 8,
                           display: 'block',
                       }}
                />
                <Space>
                    <Button type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{
                                width: 90,
                            }}>
                        Поиск
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                    >
                        Стереть
                    </Button>
                    <Button type="link"
                            size="small"
                            onClick={() => {
                                confirm({
                                    closeDropdown: false,
                                });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                    >
                        Фильтровать
                    </Button>
                    <Button type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}>
                        закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{
                    backgroundColor: '#ffc069',
                    padding: 0,
                }}
                             searchWords={[searchText]}
                             autoEscape
                             textToHighlight={text ? text.toString() : ''}/>
            ) : (
                text
            ),
    });

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Фамилия игрока',
            dataIndex: 'playerSurname',
            key: 'playerSurname',
            ...getColumnSearchProps('playerSurname')
        },
        {
            title: 'Имя игрока',
            dataIndex: 'playerName',
            key: 'newsView'
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
                            background: 'green',
                            color: 'white'
                        }}
                                onClick={() => {
                                    return showModal(record.id)
                                }}>
                            Изменить игрока
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этого игрока?"
                            onConfirm={() => confirmOneGood(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить игрока</Button>
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
        getAllPlayer().then(({players}) => {
            setPlayer(players)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [onePlayer, setOnePlayer] = React.useState([])
    const showModal = (record) => {
        setIsOpen(true)
        if (record)
            getOnePlayer(record).then(({candidate}) => {
                setOnePlayer(candidate)
            })
        else
            setOnePlayer(null)
    }

    const confirmOneGood = (id) => {
        deleteOnePlayer(id).then(() => {
            getAllPlayer().then(({players}) => {
                setPlayer(players);
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

    const confirmAllGood = () => {
        deleteAllPlayer().then(() => {
            getAllPlayer().then(({players}) => {
                setPlayer(players);
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
                   dataSource={player.map((player) => ({...player, key: player.id}))}
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
                                       onClick={() => {
                                           showModal(null)
                                       }}>Добавить игрока</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить всех игроков?"
                                   onConfirm={() => {
                                       confirmAllGood()
                                   }}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить всех игроков</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminPlayerModal open={isOpen}
                              player={onePlayer}
                              onOk={handleOk}
                              onCancel={handleCancel}/>
        </>
    );
};

export default AdminPlayer;
