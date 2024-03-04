import React from 'react';
import {
    Button,
    Input,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {useClub} from "../../store/ClubStore";
import {getOneClub} from "../../http/clubApi";
import AdminClubModal from "./modals/AdminClubModal";

const AdminClub = () => {
    const [api, contextHolder] = notification.useNotification()
    const url = process.env.REACT_APP_API_PATH
    let {
        getAllClub,
        deleteOneClub,
        deleteAllClub
    } = useClub()
    const [club, setClub] = React.useState([])
    React.useEffect(() => {
        getAllClub().then(({clubs}) => {
            setClub(clubs)
        })
    }, [getAllClub])

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
            title: 'Изображение',
            dataIndex: 'clubImage',
            key: 'clubImage',
            render: (text, record) => (
                <img
                    src={`${url}${record.clubImage}`}
                    alt="Изображение клуба"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
            ),
        },
        {
            title: 'Название клуба',
            dataIndex: 'clubName',
            key: 'clubName',
            ...getColumnSearchProps('clubName')
        },
        {
            title: 'Количество очков',
            dataIndex: 'clubPoint',
            key: 'clubPoint',
            sorter: (a, b) => a.clubPoint - b.clubPoint
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
                            Изменить клуб
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этот клуб?"
                            onConfirm={() => confirmOneClub(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить клуб</Button>
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
        getAllClub().then(({clubs}) => {
            setClub(clubs)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [oneClub, setOneClub] = React.useState([])
    const showModal = (record) => {
        setIsOpen(true)
        if (record)
            getOneClub(record).then(({candidate}) => {
                setOneClub(candidate)
            })
        else
            setOneClub(null)
    }

    const confirmOneClub = (id) => {
        deleteOneClub(id).then(() => {
            getAllClub().then(({clubs}) => {
                setClub(clubs);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Клуб с номером ${id} успешно удален!`,
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

    const confirmAllClub = () => {
        deleteAllClub().then(() => {
            getAllClub().then(({clubs}) => {
                setClub(clubs);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши клубы успешно удалены!`,
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
                   dataSource={club.map((club) => ({...club, key: club.id}))}
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
                                   title="Вы уверены, что хотите удалить все клубы?"
                                   onConfirm={() => {
                                       confirmAllClub()
                                   }}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить все клубы</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminClubModal open={isOpen}
                            club={oneClub}
                            onOk={handleOk}
                            onCancel={handleCancel}/>
        </>
    );
};

export default AdminClub;
