import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    PROFILE,
    MAP_ROUTE,
    ABOUT,
    TARIFFS,
    REVIEWS, 
    PARTNERS,
} from "./utils/consts";

import Log from '../src/pages/Login'
import Reg from './pages/Register'
import Profile from './pages/Profile';
import Tariffs from './pages/Plans'
import Reviews from "./pages/Reviews";
import Main from './pages/Main'
import OpenLayersMap from "./components/Map";
import About from "./pages/About";
import Partners from "./pages/Partners";

export const authRoutes = [
    {
        path: PROFILE,
        Component: Profile,
    }
]
export const publicRoutes = [
    {
        path: TARIFFS,
        Component: Tariffs
    },
    {
        path: PARTNERS,
        Component: Partners
    },
    {
        path: ABOUT,
        Component: About
    },
    {
        path: SHOP_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Log
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Reg
    },
    {
        path: MAP_ROUTE,
        Component: OpenLayersMap
    },
    {
        path: REVIEWS,
        Component: Reviews
    },
]