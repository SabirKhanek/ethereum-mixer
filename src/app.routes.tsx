import { RouteObject } from 'react-router-dom';
import { Home } from './pages/home';
import { ConfirmMixer } from './pages/confirm_mixer';
import { AwaitMixer } from './pages/await_mixer';

const routes: RouteObject[] = [{
    path: '/',
    element: <Home/>
}, {
    path: 'confirm_mixer',
    element: <ConfirmMixer/>
}, {
    path: 'await_mixer',
    element: <AwaitMixer/>
},{
    path: '*',
    element: <h1>Not Found</h1>
}]

export default routes;