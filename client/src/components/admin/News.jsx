import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table,
    Image
} from "antd";
import {useNews} from "../../store/News";
import NewsModal from "./modals/NewsModal";
import {SearchOutlined} from "@ant-design/icons";

const News = () => {
    const [api, contextHolder] = notification.useNotification()
    const {
        getAllNews,
        getOneNews,
        deleteAllNews,
        deleteOneNews
    } = useNews()

    const [news, setNews] = React.useState([])
    React.useEffect(() => {
        getAllNews().then(({news}) => {
            setNews(news)
        })
    }, [getAllNews])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Заголовок новости',
            dataIndex: 'newsTitle',
            key: 'newsTitle',
            ellipsis: true
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
                            background: 'orange',
                            color: 'white'
                        }}
                                onClick={() => showModal(record.id)}>
                            Изменить новость
                        </Button>
                        <Popconfirm title="Вы уверены, что хотите удалить эту новость?"
                                    onConfirm={() => confirmOneNews(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить новость
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
        getAllNews().then(({news}) => {
            setNews(news)
        })
        setIsOpen(false)
    }

    const [oneNews, setOneNews] = React.useState([])
    const showModal = (id) => {
        setIsOpen(true)
        if (id)
            getOneNews(id).then(({news}) => {
                setOneNews(news)
            })
        else
            setOneNews(null)
    }

    const confirmOneNews = (id) => {
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

    const confirmAllNews = () => {
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
                   dataSource={
                       news.map((news) => ({
                               ...news,
                               key: news.id
                           })
                       )}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <div style={{
                                   display: "flex",
                                   flexFlow: 'row wrap'
                               }}>
                                   <div style={{
                                       marginRight: '1rem'
                                   }}>
                                       <Image width={350}
                                              src={`${process.env.REACT_APP_API_PATH}/${record.newsImage}`}/>
                                   </div>
                                   <>
                                       <p>
                                           {record?.newsDescription}
                                       </p>
                                   </>
                               </div>

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
                                       onClick={() => showModal(null)}>Добавить новость</Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все новости?"
                                           onConfirm={confirmAllNews}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все новости
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <NewsModal open={isOpen}
                       oneNews={oneNews}
                       closeModal={closeModal}/>
        </>
    );
};

export default News;