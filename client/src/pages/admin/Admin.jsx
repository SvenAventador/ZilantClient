import React from 'react';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../store/User";
import {MAIN_PATH} from "../../utils/utils";
import Swal from "sweetalert2";
import {
    BookOutlined,
    FileImageOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    ShopOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Button,
    Layout,
    Menu
} from "antd";
import Sider from "antd/es/layout/Sider";
import News from "../../components/admin/News";
import Club from "../../components/admin/Club";
import Player from "../../components/admin/Player";
import Match from "../../components/admin/Match";
import Gallery from "../../components/admin/Gallery";
import History from "../../components/admin/History";
import Merchandise from "../../components/admin/Merchandise";
import Personal from "../../components/admin/Personal";
import Orders from "../../components/admin/Orders";

const Admin = () => {
    const history = useNavigate()

    const [collapsed, setCollapsed] = React.useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [selectedMenuItem, setSelectedMenuItem] = React.useState('teams')
    let {
        logoutUser
    } = useUser()

    function getItem(label, key, icon, onClick) {
        return {
            label,
            key,
            icon,
            onClick
        };
    }

    const items = [
        getItem('Клуб', '1', <TeamOutlined/>, () => setSelectedMenuItem('teams')),
        getItem('История', '2', <BookOutlined />, () => setSelectedMenuItem('history')),
        getItem('Галлерея', '3', <FileImageOutlined/>, () => setSelectedMenuItem('galleries')),
        getItem('Матчи', '4', <TrophyOutlined/>, () => setSelectedMenuItem('matches')),
        getItem('Мерч', '5', <ShopOutlined/>, () => setSelectedMenuItem('merchandise')),
        getItem('Новости', '6', <ReadOutlined/>, () => setSelectedMenuItem('news')),
        getItem('Игроки', '7', <UserOutlined/>, () => setSelectedMenuItem('players')),
        getItem('Руководство', '8', <UserOutlined/>, () => setSelectedMenuItem('team')),
        getItem('Заказы', '9', <ShopOutlined/>, () => setSelectedMenuItem('order')),
        getItem('Выход', '10', <LogoutOutlined/>, () => {
            logoutUser().then(() => {
                Swal.fire({
                    title: "Внимание",
                    text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                    icon: "success"
                }).then(() => {
                    history(MAIN_PATH);
                })
            })
        })
    ]

    return (
        <Layout style={{
            height: '100vh',
        }}>
            <Sider collapsible
                   style={{
                       background: 'white'
                   }}
                   width={500}
                   collapsed={collapsed}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button type="text"
                            onClick={toggleCollapsed}
                            className="collapse-button"
                            style={{
                                backgroundColor: '#fff',
                                width: '80px',
                                marginRight: '1rem',
                                marginBottom: '.5rem'
                            }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>
                <Menu defaultSelectedKeys={['1']}
                      mode="inline"
                      items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Layout.Content>
                    {selectedMenuItem === 'news' && <News/>}
                    {selectedMenuItem === 'history' && <History/>}
                    {selectedMenuItem === 'merchandise' && <Merchandise/>}
                    {selectedMenuItem === 'teams' && <Club/>}
                    {selectedMenuItem === 'players' && <Player/>}
                    {selectedMenuItem === 'matches' && <Match/>}
                    {selectedMenuItem === 'galleries' && <Gallery/>}
                    {selectedMenuItem === 'team' && <Personal/>}
                    {selectedMenuItem === 'order' && <Orders />}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
