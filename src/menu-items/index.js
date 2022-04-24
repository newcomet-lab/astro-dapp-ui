// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const items = {
    id: 'menu-items',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'account',
            title: 'Your Account',
            type: 'item',
            url: '/account',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'swap',
            title: 'Buy / Swap',
            type: 'item',
            url: '/swap',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [items]
};

export default menuItems;
