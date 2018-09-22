import Loadable from 'react-loadable';
import Loader from './components/Helpers/Loader';

function MyLoadable(opts) {
  return Loadable(Object.assign({
    loading: Loader,
    delay: 300,
    timeout: 10000,
  }, opts));
};

export const Home = MyLoadable({
  loader: () => import("./pages/Home"),
  modules: ['./pages/Home'],
  webpack: () => [require.resolveWeak('./pages/Home')]
});
export const Events = MyLoadable({
  loader: () => import("./pages/Events"),
  modules: ['./pages/Events'],
  webpack: () => [require.resolveWeak('./pages/Events')]
});
export const Invite = MyLoadable({
  loader: () => import("./pages/Invite"),
  modules: ['./pages/Invite'],
  webpack: () => [require.resolveWeak('./pages/Invite')]
});
export const MyEvents = MyLoadable({
  loader: () => import("./pages/MyEvents"),
  modules: ['./pages/MyEvents'],
  webpack: () => [require.resolveWeak('./pages/MyEvents')]
});
export const Profile = MyLoadable({
  loader: () => import("./pages/Profile"),
  modules: ['./pages/Profile'],
  webpack: () => [require.resolveWeak('./pages/Profile')]
});
export const News = MyLoadable({
  loader: () => import("./pages/News"),
  modules: ['./pages/News'],
  webpack: () => [require.resolveWeak('./pages/News')]
});
export const Bookmarks = MyLoadable({
  loader: () => import("./pages/Bookmarks"),
  modules: ['./pages/Bookmarks'],
  webpack: () => [require.resolveWeak('./pages/Bookmarks')]
});
export const NotFound = MyLoadable({
  loader: () => import("./pages/NotFound"),
  modules: ['./pages/NotFound'],
  webpack: () => [require.resolveWeak('./pages/NotFound')]
});

export const routes = [
  {
    isExact: true,
    protected: false,
    path: '/',
    component: Home
  },
  {
    isExact: false,
    protected: true,
    path: '/events',
    component: Events
  },
  {
    isExact: false,
    protected: true,
    path: '/invite',
    component: Invite
  },
  {
    isExact: false,
    protected: true,
    path: '/my-events',
    component: MyEvents
  },
  {
    isExact: false,
    protected: true,
    path: '/profile/:id',
    component: Profile
  },
  {
    isExact: false,
    protected: true,
    path: '/news',
    component: News
  },
  {
    isExact: false,
    protected: true,
    path: '/bookmarks',
    component: Bookmarks
  },
  {
    protected: false,
    path: '',
    component: NotFound
  },
];
