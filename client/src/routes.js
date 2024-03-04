import {
    ADMIN_PAGE,
    AUTH_ROUTE,
    NOTFOUND_ROUTE,
} from "./utils/utils";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminPage from "./pages/AdminPage";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound
    },
    {
        path: ADMIN_PAGE,
        Component: AdminPage
    }
]