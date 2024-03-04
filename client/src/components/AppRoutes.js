import React from 'react';
import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import {publicRoutes} from "../routes";
import {NOTFOUND_ROUTE} from "../utils/utils";

const AppRoutes = () => {
    return (
        <Routes>
            {
                publicRoutes.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={<Component/>}
                    />
                ))
            }

            <Route path="*" element={<Navigate replace to={NOTFOUND_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRoutes;
