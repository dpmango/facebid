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
    protected: false,
    path: '',
    component: NotFound
  },
];
