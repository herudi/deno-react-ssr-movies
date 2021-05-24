import { Home } from './page/Home.tsx';
import { Detail } from './page/Detail.tsx';
import { Galery } from './page/Galery.tsx';
import { Pricing } from './page/Pricing.tsx';

export const Routes = [
    {
        path: '/',
        name: 'home',
        exact: true,
        component: Home,
        apiUrl: '/api/movie/popular',
        seo: {
            title: 'Welcome to movie123',
            desc: 'This website demo React ssr using Deno'
        }
    },
    {
        path: '/detail/:id/:title',
        name: 'detail',
        component: Detail,
        apiUrl: '/api/movie/:id',
        seo: void 0
    },
    {
        path: '/galery',
        name: 'galery',
        component: Galery,
        apiUrl: void 0,
        seo: {
            title: 'Welcome to galery',
            desc: 'Sample page galery'
        }
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: Pricing,
        apiUrl: void 0,
        seo: {
            title: 'Welcome to pricing',
            desc: 'Sample page pricing'
        }
    },

];
