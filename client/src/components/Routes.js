import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {
    ADMIN_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PERSONAL_PATH,
    REGISTRATION_PATH
} from "../utils/const";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import Admin from "../pages/admin/Admin";
import Personal from "../pages/user/Personal";

const Layout = ({children}) => {
    return (
        <>
            <div className="content-wrapper">
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
