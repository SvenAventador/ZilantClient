import React from 'react';
import {Table, Select, Image} from 'antd';
import {changeStatus, getAllOrders} from "../../http/order";
import Swal from "sweetalert2";

const {Option} = Select;

const statusOptions = [
    {id: 1, typeName: 'Заказ обрабатывается'},
    {id: 2, typeName: 'Заказ обработан'},
    {id: 3, typeName: 'Заказ в доставке'},
    {id: 4, typeName: 'Заказ готов к получению'},
    {id: 5, typeName: 'Заказ в городе'},
    {id: 6, typeName: 'Заказ получен'}
];

const Orders = () => {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        getAllOrders().then((data) => {
            setOrders(data);
        })
    }, []);

    const expandedRowRender = (order) => {
        const columns = [
            {
                title: 'Картинка',
                dataIndex: ['merchandise', 'merchandiseImage'],
                key: 'merchandiseImage',
                render: (text) => <Image src={process.env.REACT_APP_API_PATH + text} width={50}/>
            },
            {title: 'Название', dataIndex: ['merchandise', 'merchandiseName'], key: 'merchandiseName'},
            {title: 'Цена', dataIndex: ['merchandise', 'merchandisePrice'], key: 'merchandisePrice'}
        ];

        const data = order?.merchandise_orders?.map(item => ({
            key: item.id,
            merchandise: item.merchandise
        }));

        return <Table
            columns={columns}
            dataSource={data}
            pagination={false}/>;
    };

    const columns = [
        {title: 'Никнейм пользователя', dataIndex: 'userName', key: 'userName'},
        {title: 'Почта пользователя', dataIndex: 'userEmail', key: 'userEmail'}
    ];

    const orderColumns = [
        {title: 'Дата заказа', dataIndex: 'dateOrder', key: 'dateOrder'},
        {title: 'Сумма заказа', dataIndex: 'fullPrice', key: 'fullPrice'},
        {
            title: 'Status',
            dataIndex: 'deliveryStatusId',
            key: 'deliveryStatusId',
            render: (_, record) => (
                <Select defaultValue={record.deliveryStatusId} style={{width: 200}}
                        onChange={(value) => handleStatusChange(record.id, value)}>
                    {statusOptions.map(option => (
                        <Option key={option.id} value={option.id}>{option.typeName}</Option>
                    ))}
                </Select>
            )
        }
    ];

    const handleStatusChange = (orderId, statusId) => {
        changeStatus(orderId, statusId).then(() => {
            return Swal.fire({
                title: 'Внимание!',
                text: 'Вы успешно изменили статус заказа!',
                icon: 'success'
            })
        }).catch((error) => {
            return Swal.fire({
                title: 'Внимание!',
                text: error.response.data.message,
                icon: 'error'
            })
        })
    };

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <Table
                        columns={orderColumns}
                        dataSource={record.orders.map(order => ({
                            key: order.id,
                            ...order
                        }))}
                        pagination={false}
                        expandable={{
                            expandedRowRender
                        }}
                    />
                )
            }}
            dataSource={orders.map(user => ({
                key: user.id,
                ...user
            }))}
        />
    );
};

export default Orders;
