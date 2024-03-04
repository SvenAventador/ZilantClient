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
import {getAllNews, getOneNews} from "../../http/newsApi";
import AdminNewsModal from "./modals/AdminNewsModal";
import {useGallery} from "../../store/GalleryStore";

const AdminGallery = () => {
    const [api, contextHolder] = notification.useNotification()

    let {
        getAllGallery,
        deleteOneGallery,
        deleteAllGallery
    } = useGallery()
    const [gallery, setGallery] = React.useState([])
    React.useEffect(() => {
        getAllGallery().then(({gallery}) => {
            setGallery(gallery)
        })
    }, [getAllGallery])

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
            title: 'Заголовок галереи',
            dataIndex: 'galleryTitle',
            key: 'galleryTitle',
            ...getColumnSearchProps('galleryTitle')
        },
        {
            title: 'Описание галереи',
            dataIndex: 'galleryDescription',
            key: 'galleryDescription'
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
                        <Popconfirm
                            title="Вы уверены, что хотите удалить эту галерею?"
                            onConfirm={() => confirmOneGood(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить галереи</Button>
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
        getAllGallery().then(({gallery}) => {
            setGallery(gallery)
        })
        setIsOpen(false)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }
    const showModal = (record) => {
        setIsOpen(true)
    }

    const confirmOneGood = (id) => {
        deleteOneGallery(id).then(() => {
            getAllNews().then(({gallery}) => {
                setGallery(gallery);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Галерея с номером ${id} успешно удалена!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllGood = () => {
        deleteAllGallery().then(() => {
            getAllGallery().then(({gallery}) => {
                setGallery(gallery);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши галереи успешно удалены!`,
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
                   dataSource={gallery.map((gallery) => ({...gallery, key: gallery.id}))}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                   {record.image.map((images, index) => (
                                       <img style={{width: '100px', height: '100px', marginRight: '1rem'}}
                                            key={index}
                                            src={`${process.env.REACT_APP_API_PATH}${images.imageName}`}
                                            aria-label="Изобрадение галереи"
                                            alt="Изображение галереи"
                                       />

                                   ))}
                               </div>
                           )
                       },
                       rowExpandable: (record) => record.image.length !== null
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
        </>ы
    );
};

export default AdminGallery;
