import React, {useState} from 'react';
import {
    create,
    createChapters,
    deleteAllTitle, deleteOneChapter,
    deleteOneTitle,
    editChapter,
    editTitle,
    getAll
} from "../../http/history";
import {
    Button,
    Popconfirm,
    Space,
    Table,
    Modal,
    Form,
    Input,
    notification
} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const History = () => {
    const [history, setHistory] = React.useState([]);

    const [addHistoryForm] = Form.useForm();
    const [editHistoryForm] = Form.useForm();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingSection, setEditingSection] = useState(null);

    const [addChapterForm] = Form.useForm();
    const [editChapterForm] = Form.useForm();
    const [isAddChapterModalVisible, setIsAddChapterModalVisible] = useState(false);
    const [isEditChapterModalVisible, setIsEditChapterModalVisible] = useState(false);
    const [editingChapterSection, setEditingChapterSection] = useState(null);

    React.useEffect(() => {
        getAll().then((data) => {
            setHistory(data)
        })
    }, [])

    const mainColumns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text, record, index) => index + 1
        },
        {
            title: 'Название раздела',
            dataIndex: 'historyTitle',
            key: 'historyTitle'
        },
        {
            title: '',
            key: 'actions',
            render: (record) => (
                <Space size="large"
                       style={{
                           display: "flex",
                           flexFlow: "row"
                       }}>
                    <Button style={{
                        background: 'orange',
                        color: 'white'
                    }}
                            onClick={() => {
                                setEditingSection(record)
                                editHistoryForm.setFieldsValue({historyTitle: record.historyTitle, id: record.id})
                                setIsEditModalVisible(true)
                            }}>
                        Изменить раздел
                    </Button>
                    <Popconfirm title="Вы уверены, что хотите удалить этот раздел?"
                                okText="Да"
                                onConfirm={() => {
                                    deleteOneTitle(record.id).then(() => {
                                        getAll().then((data) => {
                                            setHistory(data)
                                        })
                                        notification.success({
                                            message: 'Внимание!',
                                            description: `Раздел успешно удален!`,
                                        })
                                    })
                                }}
                                cancelText="Отмена">
                        <Button style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}>
                            Удалить раздел
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const chapterColumns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Текст раздела',
            dataIndex: 'historyChapter',
            key: 'historyChapter',
            ellipsis: true
        },
        {
            title: '',
            key: 'actions',
            render: (record) => (
                <Space size="large"
                       style={{
                           display: "flex",
                           flexFlow: "row"
                       }}>
                    <Button style={{
                        background: 'orange',
                        color: 'white'
                    }}
                            onClick={() => {
                                setEditingChapterSection(record)
                                editChapterForm.setFieldsValue({historyChapter: record.historyChapter, id: record.id})
                                setIsEditChapterModalVisible(true)
                            }}>
                        Изменить текст раздела
                    </Button>
                    <Popconfirm title="Вы уверены, что хотите удалить этот текст?"
                                okText="Да"
                                onConfirm={() => {
                                    deleteOneChapter(record.id).then(() => {
                                        getAll().then((data) => {
                                            setHistory(data)
                                        })
                                        notification.success({
                                            message: 'Внимание!',
                                            description: `Текст раздела успешно удален!`,
                                        })
                                    })
                                }}
                                cancelText="Отмена">
                        <Button style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}>
                            Удалить текст раздела
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
    )

    const handleAddSection = () => {
        addHistoryForm.validateFields().then(values => {
            const history = new FormData()
            history.append('historyTitle', values.historyTitle)
            values.historyChapter.forEach((chapter) => {
                history.append(`historyChapter`, chapter.historyChapter);
            })
            create(history).then(() => {
                notification.success({
                    message: 'Раздел добавлен',
                    description: `Название раздела: ${values.historyTitle}`,
                })
                setIsAddModalVisible(false)
                addHistoryForm.resetFields()
                getAll().then((data) => {
                    setHistory(data)
                })
            }).catch((error) => {
                return notification.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                })
            })
        }).catch((info) => {
            console.log('Validate Failed:', info);
        })
    }

    const handleEditSection = () => {
        editHistoryForm.validateFields().then(values => {
            const history = new FormData()
            history.append('historyTitle', values.historyTitle)
            editTitle(values.id, history).then(() => {
                notification.success({
                    message: 'Раздел добавлен',
                    description: `Название раздела: ${values.historyTitle}`,
                })
                setIsEditModalVisible(false)
                editHistoryForm.resetFields()
                getAll().then((data) => {
                    setHistory(data)
                })
            }).catch((error) => {
                return notification.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                })
            })
        }).catch((info) => {
            console.log('Validate Failed:', info);
        })
    }

    const confirmCloseEditModal = () => {
        Modal.confirm({
            title: 'Подтвердите закрытие',
            content: 'Вы уверены, что хотите закрыть окно без сохранения изменений?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                setIsEditModalVisible(false)
                setIsAddModalVisible(false)
                editHistoryForm.resetFields()
                addHistoryForm.resetFields()
            }
        })
    }

    const confirmCloseAddModal = () => {
        Modal.confirm({
            title: 'Подтвердите закрытие',
            content: 'Вы уверены, что хотите закрыть окно без сохранения изменений?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                setIsEditModalVisible(false)
                setIsAddModalVisible(false)
                editHistoryForm.resetFields()
                addHistoryForm.resetFields()
            }
        })
    }

    const handleAddChapter = () => {
        addChapterForm.validateFields().then(values => {
            const history = new FormData()
            values.historyChapter.forEach((chapter) => {
                history.append(`historyChapter`, chapter.historyChapter);
            })
            createChapters(editingChapterSection, history).then(() => {
                notification.success({
                    message: 'Данные добавлены'
                })
                setIsAddChapterModalVisible(false)
                addChapterForm.resetFields()
                getAll().then((data) => {
                    setHistory(data)
                })
            }).catch((error) => {
                return notification.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                })
            })
        }).catch((info) => {
            console.log('Validate Failed:', info);
        })
    }

    const handleEditChapter = () => {
        editChapterForm.validateFields().then(values => {
            console.log(values)
            editChapter(values.id, values.historyChapter).then(() => {
                notification.success({
                    message: 'Раздел добавлен',
                    description: `Название раздела: ${values.historyTitle}`,
                })
                setIsEditChapterModalVisible(false)
                editChapterForm.resetFields()
                getAll().then((data) => {
                    setHistory(data)
                })
            }).catch((error) => {
                return notification.error({
                    message: 'Внимание!',
                    description: error.response.data.message,
                })
            })
        }).catch((info) => {
            console.log('Validate Failed:', info);
        })
    }

    const confirmCloseEditChapterModal = () => {
        Modal.confirm({
            title: 'Подтвердите закрытие',
            content: 'Вы уверены, что хотите закрыть окно без сохранения изменений?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                setIsEditChapterModalVisible(false)
                setIsAddChapterModalVisible(false)
                editChapterForm.resetFields()
                addChapterForm.resetFields()
            }
        })
    }

    const confirmCloseAddChapterModal = () => {
        Modal.confirm({
            title: 'Подтвердите закрытие',
            content: 'Вы уверены, что хотите закрыть окно без сохранения изменений?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                setIsEditChapterModalVisible(false)
                setIsAddChapterModalVisible(false)
                editChapterForm.resetFields()
                addChapterForm.resetFields()
            }
        })
    }

    return (
        <>
            <Table columns={mainColumns}
                   dataSource={history.map((history) => ({
                       ...history,
                       key: history.id
                   }))}
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
                   expandable={{
                       expandedRowRender: (record) => (
                           <Table columns={chapterColumns}
                                  dataSource={record.history_chapters.map((chapter) => ({
                                      ...chapter,
                                      key: chapter.id
                                  }))}
                                  pagination={{
                                      defaultPageSize: 5,
                                      showSizeChanger: false
                                  }}
                                  title={() => (
                                      <Space size="large">
                                          <Button style={{
                                              backgroundColor: 'green',
                                              color: 'white'
                                          }}
                                                  onClick={() => {
                                                      setEditingChapterSection(record.id)
                                                      setIsAddChapterModalVisible(true)
                                                  }}>
                                              Добавить текст к разделу
                                          </Button>
                                      </Space>
                                  )}
                           />
                       )
                   }}
                   title={() => (
                       <Space size="large">
                           <Button style={{
                               backgroundColor: 'green',
                               color: 'white'
                           }}
                                   onClick={() => setIsAddModalVisible(true)}>
                               Добавить раздел истории
                           </Button>
                           <Popconfirm title="Вы уверены, что хотите удалить все записи об истории клуба?"
                                       okText="Да"
                                       onConfirm={() => {
                                           deleteAllTitle().then(() => {
                                               getAll().then((data) => {
                                                   setHistory(data)
                                               })
                                               notification.success({
                                                   message: 'Внимание!',
                                                   description: `Раздел успешно удален!`,
                                               })
                                           })
                                       }}
                                       cancelText="Отмена">
                               <Button style={{
                                   backgroundColor: 'red',
                                   color: 'white'
                               }}>
                                   Удалить все разделы
                               </Button>
                           </Popconfirm>
                       </Space>
                   )}
            />

            <Modal title="Добавить раздел истории"
                   open={isAddModalVisible}
                   onOk={handleAddSection}
                   onCancel={confirmCloseAddModal}
                   maskClosable={confirmCloseAddModal}
                   okText="Добавить"
                   cancelText="Отмена">
                <Form form={addHistoryForm}
                      layout="vertical">
                    <Form.Item label="Название раздела"
                               name="historyTitle"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите название раздела!'
                                   }
                               ]}>
                        <Input placeholder={"Пожалуйста, введите название раздела..."}/>
                    </Form.Item>
                    <Form.List name="historyChapter"
                               initialValue={[{historyChapter: ''}]}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map((
                                    {
                                        key,
                                        name,
                                        fieldKey,
                                        ...restField
                                    }) => (
                                    <div key={key}
                                         style={{
                                             display: 'flex',
                                             flexFlow: 'column',
                                             marginBottom: 8
                                         }}>
                                        <Form.Item{...restField}
                                                  name={[name, 'historyChapter']}
                                                  fieldKey={[fieldKey, 'historyChapter']}
                                                  rules={[
                                                      {
                                                          required: true,
                                                          message: 'Пожалуйста, введите текст раздела!'
                                                      }
                                                  ]}>
                                            <Input.TextArea placeholder="Текст раздела"/>
                                        </Form.Item>
                                        <Button style={{
                                            backgroundColor: 'red',
                                            color: '#FFF'
                                        }}
                                                onClick={() => remove(name)}>
                                            Удалить
                                        </Button>
                                    </div>
                                ))}
                                <Button type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '100%'
                                        }}>
                                    Добавить текст раздела
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>

            <Modal title="Изменить раздел истории"
                   open={isEditModalVisible}
                   onOk={handleEditSection}
                   onCancel={confirmCloseEditModal}
                   maskClosable={confirmCloseEditModal}
                   okText="Сохранить"
                   cancelText="Отмена">
                <Form form={editHistoryForm}
                      layout="vertical"
                      initialValues={{
                          id: editingSection?.id,
                          historyTitle: editingSection?.historyTitle
                      }}>
                    <Form.Item label="Название раздела"
                               style={{
                                   display: 'none'
                               }}
                               name="id">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Название раздела"
                               name="historyTitle"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите название раздела!'
                                   }
                               ]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Добавить текст к разделу истории"
                   open={isAddChapterModalVisible}
                   onOk={handleAddChapter}
                   onCancel={confirmCloseAddChapterModal}
                   maskClosable={confirmCloseAddChapterModal}
                   okText="Добавить"
                   cancelText="Отмена">
                <Form form={addChapterForm}
                      layout="vertical">
                    <Form.List name="historyChapter"
                               initialValue={[{historyChapter: ''}]}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map((
                                    {
                                        key,
                                        name,
                                        fieldKey,
                                        ...restField
                                    }) => (
                                    <div key={key}
                                         style={{
                                             display: 'flex',
                                             flexFlow: 'column',
                                             marginBottom: 8
                                         }}>
                                        <Form.Item{...restField}
                                                  name={[name, 'historyChapter']}
                                                  fieldKey={[fieldKey, 'historyChapter']}
                                                  rules={[
                                                      {
                                                          required: true,
                                                          message: 'Пожалуйста, введите текст раздела!'
                                                      }
                                                  ]}>
                                            <Input.TextArea placeholder="Текст раздела"/>
                                        </Form.Item>
                                        <Button style={{
                                            backgroundColor: 'red',
                                            color: '#FFF'
                                        }}
                                                onClick={() => remove(name)}>
                                            Удалить
                                        </Button>
                                    </div>
                                ))}
                                <Button type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '100%'
                                        }}>
                                    Добавить текст раздела
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>

            <Modal title="Изменить текст раздела истории"
                   open={isEditChapterModalVisible}
                   onOk={handleEditChapter}
                   onCancel={confirmCloseEditChapterModal}
                   maskClosable={confirmCloseEditChapterModal}
                   okText="Сохранить"
                   cancelText="Отмена">
                <Form form={editChapterForm}
                      layout="vertical"
                      initialValues={{
                          id: editingChapterSection?.id,
                          historyChapter: editingChapterSection?.historyChapter
                      }}>
                    <Form.Item label="Название раздела"
                               style={{
                                   display: 'none'
                               }}
                               name="id">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Название раздела"
                               name="historyChapter"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Пожалуйста, введите название раздела!'
                                   }
                               ]}>
                        <Input.TextArea placeholder="Текст раздела"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default History;