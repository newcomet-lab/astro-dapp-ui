import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const AdminPanel = Loadable(lazy(() => import('views/admin-panel')));
const NewVesting = Loadable(lazy(() => import('views/new-vesting')));
const VestingDetail = Loadable(lazy(() => import('views/vesting-detail')));

export const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <AdminPanel />
        },
        {
            path: 'account',
            element: <NewVesting />
        },
        {
            path: 'swap',
            element: <VestingDetail />
        }
    ]
};
