import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {
    ADMIN_PATH, CART_PATH,
    CHAMPIONSHIP_PATH,
    CLUB_PATH,
    COMMAND_PATH,
    CURRENT_NEWS_PATH,
    GALLERY_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    MEDIA_PATH,
    MERCHANDISE_PATH,
    NEWS_PATH,
    PERSONAL_PATH,
    REGISTRATION_PATH
} from "../utils/utils";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import Admin from "../pages/admin/Admin";
import Personal from "../pages/user/Personal";
import HeaderComponent from "./user/global/Header";
import Championship from "../pages/user/navigation/Championship";
import Club from "../pages/user/navigation/Club";
import Command from "../pages/user/navigation/Command";
import Media from "../pages/user/navigation/Media";
import Merchandise from "../pages/user/navigation/Merchandise";
import News from "../pages/user/navigation/News";
import CurrentNews from "../pages/user/CurrentNews";
import CurrentGallery from "../pages/user/CurrentGallery";
import Cart from "../pages/user/Cart";

const Layout = ({children}) => {
    return (
        <>
            <div className="content-wrapper">
                <HeaderComponent/>
                <main className="main">
                    {children}
                </main>
            </div>
        </>
    )
}

const SiteNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={MAIN_PATH}
                       element={
                           <Layout>
                               <Main/>
                           </Layout>
                       }/>
                <Route path={PERSONAL_PATH + '/:id'}
                       element={
                           <Layout>
                               <Personal/>
                           </Layout>
                       }/>
                <Route path={CURRENT_NEWS_PATH + '/:id'}
                       element={
                           <Layout>
                               <CurrentNews/>
                           </Layout>
                       }/>
                <Route path={GALLERY_PATH + '/:id'}
                       element={
                           <Layout>
                               <CurrentGallery/>
                           </Layout>
                       }/>
                <Route path={CART_PATH + '/:id'}
                       element={
                           <Layout>
                               <Cart/>
                           </Layout>
                       }/>
                <Route path={CHAMPIONSHIP_PATH}
                       element={
                           <Layout>
                               <Championship/>
                           </Layout>
                       }/>
                <Route path={CLUB_PATH}
                       element={
                           <Layout>
                               <Club/>
                           </Layout>
                       }/>
                <Route path={COMMAND_PATH}
                       element={
                           <Layout>
                               <Command/>
                           </Layout>
                       }/>
                <Route path={MEDIA_PATH}
                       element={
                           <Layout>
                               <Media/>
                           </Layout>
                       }/>
                <Route path={MERCHANDISE_PATH}
                       element={
                           <Layout>
                               <Merchandise/>
                           </Layout>
                       }/>
                <Route path={NEWS_PATH}
                                  element={
                                      <Layout>
                                          <News/>
                                      </Layout>
                                  }/>


                <Route path={REGISTRATION_PATH}
                       element={
                           <main className="main">
                               <Auth/>
                           </main>
                       }/>
                <Route path={LOGIN_PATH}
                       element={
                           <main className="main">
                               <Auth/>
                           </main>
                       }/>
                <Route path={ADMIN_PATH}
                       element={
                           <main className="main">
                               <Admin/>
                           </main>
                       }/>
            </Routes>
        </BrowserRouter>
    )
}

export default SiteNavigation;