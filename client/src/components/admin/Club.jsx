import React from 'react';
import {
    Button,
    Image,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {useClub} from "../../store/Club";
import {SearchOutlined} from "@ant-design/icons";
import ClubModal from "./modals/ClubModal";

const Club = () => {
    const [api, contextHolder] = notification.useNotification()
    const {
        getOneClub,
        getAllClub,
        deleteAllClub,
        deleteOneClub
    } = useClub()

    const [clubs, setClubs] = React.useState([])
    const [club, setClub] = React.useState([])

    React.useEffect(() => {
        getAllClub().then(({clubs}) => {
            setClubs(clubs)
        })
    }, [getAllClub])

    const column = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Изображение',
            dataIndex: 'clubImage',
            key: 'clubImage',
            render: (text, record) => (
                <Image src={`${process.env.REACT_APP_API_PATH}${record.clubImage}`}
                       alt="Изображение клуба"
                       style={{
                           maxWidth: '100px',
                           maxHeight: '100px'
                       }}/>
            ),
        },
        {
            title: 'Название клуба',
            dataIndex: 'clubName',
            key: 'clubName',
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
                            background: 'orange',
                            color: 'white'
                        }}
                                onClick={() => {
                                    showModal(record.id)
                                }}>
                            Изменить клуб
                        </Button>
                        <Popconfirm title="Вы уверены, что хотите удалить этот клуб?"
                                    okText="Да"
                                    onConfirm={() => confirmOneClub(record.id)}
                                    cancelText="Отмена">
                            <Button style={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}>
                                Удалить клуб
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
        getAllClub().then(({clubs}) => {
            setClubs(clubs)
        })
        setIsOpen(false)
    }

    const showModal = (id) => {
        setIsOpen(true)
        if (id) {
            getOneClub(id).then(({club}) => {
                setClub(club)
            })
        } else {
            setClub(null)
        }
    }

    const confirmOneClub = (id) => {
        deleteOneClub(id).then(() => {
            getAllClub().then(({clubs}) => {
                setClubs(clubs)
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
                setClubs(clubs);
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
                   dataSource={clubs.map((club) => ({
                           ...club, key: club.id
                       })
                   )}
                   bordered
                   pagination={false}
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
                                       }}>Добавить клуб</Button>
                               <Popconfirm title="Вы уверены, что хотите удалить все клубы?"
                                           onConfirm={confirmAllClub}
                                           okText="Да"
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'red',
                                       color: 'white'
                                   }}>
                                       Удалить все клубы
                                   </Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
            />
            <ClubModal open={isOpen}
                       oneClub={club}
                       closeModal={closeModal}/>
        </>
    );
};

export default Club;
