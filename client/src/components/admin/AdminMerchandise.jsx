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
import {getOneClub} from "../../http/clubApi";
import AdminClubModal from "./modals/AdminClubModal";
import {useMerchandise} from "../../store/MerchandiseStore";
import {getAllMerchandise, getOneMerchandise} from "../../http/merchandiseApi";
import AdminMerchandiseModal from "./modals/AdminMerchandiseModal";

const AdminMerchandise = () => {
    const [api, contextHolder] = notification.useNotification()
    const url = process.env.REACT_APP_API_PATH
    let {
        getAllMerch,
        deleteOneMerch,
        deleteAllMerch
    } = useMerchandise()
    const [merch, setMerch] = React.useState([])
    React.useEffect(() => {
        getAllMerch().then(({merchandises}) => {
            setMerch(merchandises)
        })
    }, [getAllMerch])

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
            title: 'Название мерча',
            dataIndex: 'merchandiseName',
            key: 'merchandiseName',
            ...getColumnSearchProps('merchandiseName')
        },
        {
            title: 'Описание мерча',
            dataIndex: 'merchandiseDescription',
            key: 'merchandiseDescription'
        },
        {
            title: 'Количество товара',
            dataIndex: 'merchandiseAmount',
            key: 'merchandiseAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => b.id - a.id,
            render: (text) => {
                if (+text >= 10)
                    return <span style={{color: "green"}}>В количестве {text}</span>
                if (+text <= 5 && +text >= 9)
                    return <span style={{color: "orange"}}>В количестве {text}</span>
                else
                    return <span style={{color: "red"}}>В количестве {text}</span>
            }
        },
        {
            title: 'Цена товара',
            dataIndex: 'merchandisePrice',
            key: 'merchandisePrice'
        },
        {
            title: 'Изображение',
            dataIndex: 'merchandiseImage',
            key: 'merchandiseImage',
            render: (text, record) => (
                <img
                    src={`${url}${record.merchandiseImage}`}
                    alt="Изображение товара"
                    style={{maxWidth: '100px', maxHeight: '100px'}}
                />
            ),
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
                            Изменить мерч
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этот мерч?"
                            onConfirm={() => confirmOneClub(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить мерч</Button>
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
        getAllMerch().then(({merchandises}) => {
            setMerch(merchandises)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [oneMerch, setOneMerch] = React.useState([])
    const showModal = (record) => {
        setIsOpen(true)
        if (record)
            getOneMerchandise(record).then(({merchandise}) => {
                setOneMerch(merchandise)
            })
        else
            setOneMerch(null)
    }

    const confirmOneClub = (id) => {
        deleteOneMerch(id).then(() => {
            getAllMerch().then(({merchandises}) => {
                setMerch(merchandises);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Мерч с номером ${id} успешно удален!`,
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
        deleteAllMerch().then(() => {
            getAllMerch().then(({merchandises}) => {
                setMerch(merchandises);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши мерчи успешно удалены!`,
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
                   dataSource={merch.map((merch) => ({ ...merch, key: merch.id }))}
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
                                       }}>Добавить мерч</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить все мерчи?"
                                   onConfirm={() => {
                                       confirmAllClub()
                                   }}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить все мерчи</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminMerchandiseModal open={isOpen}
                                   merch={oneMerch}
                                   onOk={handleOk}
                                   onCancel={handleCancel}/>
        </>
    );
};

export default AdminMerchandise;
