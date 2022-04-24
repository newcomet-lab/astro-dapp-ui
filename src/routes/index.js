import { useRoutes } from 'react-router-dom';

// routes
import { AdminRoutes, UserRoutes, AuthenticationRoutes } from './Routes';
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AdminRoutes, UserRoutes, AuthenticationRoutes], config.basename);
}
