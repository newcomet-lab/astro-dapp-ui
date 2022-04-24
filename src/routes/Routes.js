import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

const AdminPanel = Loadable(lazy(() => import('views/admin-panel')));
const NewVesting = Loadable(lazy(() => import('views/new-vesting')));
const VestingDetail = Loadable(lazy(() => import('views/vesting-detail')));
const Home = Loadable(lazy(() => import('views/home')));

// ==============================|| MAIN ROUTING ||============================== //

export const AdminRoutes = {
    path: '/admin',
    element: <MainLayout />,
    children: [
        {
            path: 'all',
            element: <AdminPanel />
        },
        {
            path: 'create',
            element: <NewVesting />
        },
        {
            path: 'detail',
            element: <VestingDetail />
        }
    ]
};

export const UserRoutes = {
    path: '/vesting',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <VestingDetail />
        }
    ]
};

export const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        }
    ]
};
