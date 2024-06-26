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
    NEWS_PATH, ORDER_PATH,
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
import MyOrder from "../pages/user/MyOrder";

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
                <Route path={GALLERY_PATH + '/video' + '/:id'}
                       element={
                           <Layout>
                               <CurrentGallery photo={false} video={true}/>
                           </Layout>
                       }/>
                <Route path={GALLERY_PATH + '/photo' + '/:id'}
                       element={
                           <Layout>
                               <CurrentGallery photo={true} video={false}/>
                           </Layout>
                       }/>
                <Route path={CART_PATH + '/:id'}
                       element={
                           <Layout>
                               <Cart/>
                           </Layout>
                       }/>
                <Route path={ORDER_PATH + '/:id'}
                       element={
                           <Layout>
                               <MyOrder/>
                           </Layout>
                       }/>
                <Route path={CHAMPIONSHIP_PATH + '/table'}
                       element={
                           <Layout>
                               <Championship table={true}
                                             calendar={false}/>
                           </Layout>
                       }/>
                <Route path={CHAMPIONSHIP_PATH + '/calendar'}
                       element={
                           <Layout>
                               <Championship table={false}
                                             calendar={true}/>
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
                <Route path={MEDIA_PATH + '/photo'}
                       element={
                           <Layout>
                               <Media photo={true}
                                      video={false}/>
                           </Layout>
                       }/>
                <Route path={MEDIA_PATH + '/video'}
                       element={
                           <Layout>
                               <Media photo={false}
                                      video={true}/>
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