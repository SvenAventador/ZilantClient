import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table,
    Image
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {deleteAll, deleteOne, getAll, getOne} from "../../http/personal";
import PersonalModal from "./modals/PersonalModal";

const Personal = () => {
    const [api, contextHolder] = notification.useNotification();
    const [personals, setPersonals] = React.useState([]);

    React.useEffect(() => {
        getAll().then(({persons}) => {
            setPersonals(persons);
        });
    }, []);

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Фамилия руководителя',
            dataIndex: 'personSurname',
            key: 'personSurname',
        },
        {
            title: 'Имя персонала',
            dataIndex: 'personName',
            key: 'personName'
        },
        {
            title: 'Отчество персонала',
            dataIndex: 'personPatronymic',
            key: 'personPatronymic'
        },
        {
            title: 'Должность',
            dataIndex: 'personPosition',
            key: 'personPosition'
        },
        {
            title: '',
            key: 'actions',
            render: (record) => (
                <Space size="large" style={{display: "flex", flexFlow: "column"}}>
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этого руководителя?"
                        onConfirm={() => confirmOnePersonal(record.id)}
                        okText="Да"
                        cancelText="Отмена"
                    >
                        <Button style={{backgroundColor: 'red', color: 'white'}}>
                            Удалить руководителя
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    );

    const [isOpen, setIsOpen] = React.useState(false);
    const closeModal = () => {
        getAll().then(({persons}) => {
            setPersonals(persons);
        });
        setIsOpen(false);
    };

    const [onePersonal, setOnePersonal] = React.useState(null);
    const showModal = (id) => {
        setIsOpen(true);
        if (id) {
            getOne(id).then((response) => {
                const {personal} = response || {}; // Safe destructuring
                setOnePersonal(personal);
            });
        } else {
            setOnePersonal(null);
        }
    };

    const confirmOnePersonal = (id) => {
        deleteOne(id).then(() => {
            getAll().then(({persons}) => {
                setPersonals(persons);
            }).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: `Руководитель с номером ${id} успешно удален!`,
                    className: 'custom-class',
                    style: {width: 600}
                });
            });
        });
    };

    const confirmAllPersonals = () => {
        deleteAll().then(() => {
            getAll().then(({persons}) => {
                setPersonals(persons);
            }).then(() => {
                api.success({
                    message: 'Внимание!',
                    description: `Все Ваши руководители успешно удалены!`,
                    className: 'custom-class',
                    style: {width: 600}
                });
            });
        });
    };

    return (
        <>
            {contextHolder}
            <Table
                columns={columns}
                dataSource={personals.map((personal) => ({...personal, key: personal.id}))}
                expandable={{
                    expandedRowRender: (record) => (
                        <Image width={350} src={`${process.env.REACT_APP_API_PATH}/${record.personImage}`}/>
                    ),
                    rowExpandable: (record) => record.personalImage !== null
                }}
                bordered
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: false
                }}
                locale={{
                    emptyText: customEmptyText
                }}
                title={() => (
                    <Space size="large">
                        <Button
                            style={{backgroundColor: 'green', color: 'white'}}
                            onClick={() => showModal(null)}
                        >
                            Добавить руководителя
                        </Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить всех руководителей?"
                            onConfirm={confirmAllPersonals}
                            okText="Да"
                            cancelText="Отмена"
                        >
                            <Button style={{backgroundColor: 'red', color: 'white'}}>
                                Удалить всех руководителей
                            </Button>
                        </Popconfirm>
                    </Space>
                )}
            />
            <PersonalModal
                open={isOpen}
                onePersonal={onePersonal}
                closeModal={closeModal}
            />
        </>
    );
};

export default Personal;
