import React from 'react';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../store/User";
import {MAIN_PATH} from "../../utils/utils";
import Swal from "sweetalert2";
import {
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
import Merchandise from "../../components/admin/Merchandise";

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

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(MAIN_PATH);
            })
        })
    }

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
        getItem('Галлерея', '2', <FileImageOutlined/>, () => setSelectedMenuItem('galleries')),
        getItem('Матчи', '3', <TrophyOutlined/>, () => setSelectedMenuItem('matches')),
        getItem('Мерч', '4', <ShopOutlined/>, () => setSelectedMenuItem('merchandise')),
        getItem('Новости', '5', <ReadOutlined/>, () => setSelectedMenuItem('news')),
        getItem('Игроки', '6', <UserOutlined/>, () => setSelectedMenuItem('players')),
        getItem('Выход', '7', <LogoutOutlined/>, handleLogout),
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
                      items={items} />
            </Sider>
            <Layout className="site-layout">
                <Layout.Content>
                    {selectedMenuItem === 'news' && <News/>}
                    {selectedMenuItem === 'merchandise' && <Merchandise />}
                    {selectedMenuItem === 'teams' && <Club/>}
                    {selectedMenuItem === 'players' && <Player/>}
                    {selectedMenuItem === 'matches' && <Match/>}
                    {selectedMenuItem === 'galleries' && <Gallery/>}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
