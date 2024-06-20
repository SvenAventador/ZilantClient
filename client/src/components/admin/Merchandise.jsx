import React from 'react';
import {Button, Image, notification, Popconfirm, Space, Table} from "antd";
import {useMerchandise} from "../../store/Merchandise";
import {SearchOutlined} from "@ant-design/icons";
import AdminMerchandise from "./modals/MerchandiseModal";

const Merchandise = () => {
    const [api, contextHolder] = notification.useNotification()
    const {
        getAllMerch,
        getOneMerch,
        deleteOneMerch,
        deleteAllMerch
    } = useMerchandise()

    const [merchandises, setMerchandises] = React.useState([])
    React.useEffect(() => {
        getAllMerch().then(({merchandises}) => {
            setMerchandises(merchandises)
        })
    }, [getAllMerch])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Название мерча',
            dataIndex: 'merchandiseName',
            key: 'merchandiseName',
            ellipsis: true
        },
        {
            title: 'Описание мерча',
            dataIndex: 'merchandiseDescription',
            key: 'merchandiseDescription',
            ellipsis: true
        },
        {
            title: 'Количество товара',
            dataIndex: 'merchandiseAmount',
            key: 'merchandiseAmount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => b.id - a.id,
            render: (text) => {
                if (+text >= 10)
                    return <span style={{
                        color: "green"
                    }}>
                        В количестве {text}
                </span>
                if (+text <= 5 && +text >= 9)
                    return <span style={{
                        color: "orange"
                    }}>
                        В количестве {text}
                </span>
                else
                    return <span style={{
                        color: "red"
                    }}>
                        В количестве {text}
                </span>
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
                <Image src={`${process.env.REACT_APP_API_PATH}${record.merchandiseImage}`}
                       alt="Изображение товара"
                       style={{
                           maxWidth: '100px',
                           maxHeight: '100px'
                       }}
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
                            background: 'orange',
                            color: 'white'
                        }}
                                onClick={() => showModal(record.id)}>
                            Изменить мерч
                        </Button>
                        <Popconfirm title="Вы уверены, что хотите удалить этот мерч?"
                                    onConfirm={() => confirmOneMerch(record.id)}
                                    okText="Да"
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить мерч
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
        getAllMerch().then(({merchandises}) => {
            setMerchandises(merchandises)
        })
        setIsOpen(false)
    }

    const [oneMerch, setOneMerch] = React.useState([])
    const showModal = (id) => {
        setIsOpen(true)
        if (id)
            getOneMerch(id).then(({merchandise}) => {
                setOneMerch(merchandise)
            })
        else
            setOneMerch(null)
    }
    const confirmOneMerch = (id) => {
        deleteOneMerch(id).then(() => {
            getAllMerch().then(({merchandises}) => {
                setMerchandises(merchandises);
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

    const confirmAllMerch = () => {
        deleteAllMerch().then(() => {
            getAllMerch().then(({merchandises}) => {
                setMerchandises(merchandises);
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
                   dataSource={merchandises.map((merch) => ({
                           ...merch, key: merch.id
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
                                       }}>Добавить мерч</Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все мерчи?"
                                           onConfirm={confirmAllMerch}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все мерчи
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <AdminMerchandise open={isOpen}
                              oneMerch={oneMerch}
                              closeModal={closeModal}/>
        </>
    );

};

export default Merchandise;