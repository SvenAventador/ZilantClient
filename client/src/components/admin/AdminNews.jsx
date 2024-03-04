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
import {useNews} from "../../store/NewsStore";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {getOneNews} from "../../http/newsApi";
import AdminNewsModal from "./modals/AdminNewsModal";

const AdminNews = () => {
    const [api, contextHolder] = notification.useNotification()

    let {
        getAllNews,
        deleteOneNews,
        deleteAllNews
    } = useNews()
    const [news, setNews] = React.useState([])
    React.useEffect(() => {
        getAllNews().then(({news}) => {
            console.log(news)
            setNews(news)
        })
    }, [getAllNews])

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
            title: 'Заголовок новости',
            dataIndex: 'newsTitle',
            key: 'newsTitle',
            ...getColumnSearchProps('newsTitle')
        },
        {
            title: 'Описание новости',
            dataIndex: 'newsView',
            key: 'newsView'
        },
        {
            title: 'Дата новости',
            dataIndex: 'newsDate',
            key: 'newsDate'
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
                            Изменить новость
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить эту новость?"
                            onConfirm={() => confirmOneGood(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить новость</Button>
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
        getAllNews().then(({news}) => {
            setNews(news)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }

    const [oneNews, setOneNews] = React.useState([])
    const showModal = (record) => {
        setIsOpen(true)
        if (record)
            getOneNews(record).then(({candidate}) => {
                setOneNews(candidate)
            })
        else
            setOneNews(null)
    }

    const confirmOneGood = (id) => {
        deleteOneNews(id).then(() => {
            getAllNews().then(({news}) => {
                setNews(news);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Новость с номером ${id} успешно удалена!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllGood = () => {
        deleteAllNews().then(() => {
            getAllNews().then(({news}) => {
                setNews(news);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши новости успешно удалены!`,
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
                   dataSource={news.map((news) => ({...news, key: news.id}))}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <Image width={350}
                                      src={`${process.env.REACT_APP_API_PATH}/${record.newsImage}`}/>
                           )
                       },
                       rowExpandable: (record) => record.newsImage !== null
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
                                       }}>Добавить новость</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить все новости?"
                                   onConfirm={() => {
                                       confirmAllGood()
                                   }}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить все новости</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminNewsModal open={isOpen}
                            news={oneNews}
                            onOk={handleOk}
                            onCancel={handleCancel}/>
        </>
    );
};

export default AdminNews;
