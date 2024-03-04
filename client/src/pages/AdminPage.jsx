import React from 'react';
import {useNavigate} from "react-router-dom";
import {useUser} from "../store/UserStore";
import {AUTH_ROUTE} from "../utils/utils";
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
import AdminNews from "../components/admin/AdminNews";
import AdminClub from "../components/admin/AdminClub";
import AdminPlayer from "../components/admin/AdminPlayer";
import AdminMatch from "../components/admin/AdminMatch";
import AdminGallery from "../components/admin/AdminGallery";
import AdminMerchandise from "../components/admin/AdminMerchandise";

const AdminPage = () => {
    const history = useNavigate()

    const [collapsed, setCollapsed] = React.useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [selectedMenuItem, setSelectedMenuItem] = React.useState('news')
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
                history(AUTH_ROUTE);
            });
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
        getItem('Новости', '1', <ReadOutlined/>, () => setSelectedMenuItem('news')),
        getItem('Клуб', '2', <TeamOutlined/>, () => setSelectedMenuItem('teams')),
        getItem('Игроки', '3', <UserOutlined/>, () => setSelectedMenuItem('players')),
        getItem('Матчи', '4', <TrophyOutlined/>, () => setSelectedMenuItem('matches')),
        getItem('Мерч', '5', <ShopOutlined/>, () => setSelectedMenuItem('merchandise')),
        getItem('Галлерея', '6', <FileImageOutlined/>, () => setSelectedMenuItem('galleries')),
        getItem('Выход', '7', <LogoutOutlined/>, () => handleLogout),
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
                    {selectedMenuItem === 'news' && <AdminNews/>}
                    {selectedMenuItem === 'merchandise' && <AdminMerchandise />}
                    {selectedMenuItem === 'teams' && <AdminClub/>}
                    {selectedMenuItem === 'players' && <AdminPlayer/>}
                    {selectedMenuItem === 'matches' && <AdminMatch/>}
                    {selectedMenuItem === 'galleries' && <AdminGallery/>}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
