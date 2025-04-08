import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    PROFILE,
    ABOUT,
    TARIFFS,
} from "./utils/consts";

import Log from '../src/pages/Login'
import Reg from './pages/Register'
import Profile from './pages/Profile';
import Tariffs from './pages/Plans'

import Main from './pages/Main'
import About from "./pages/About";

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
]