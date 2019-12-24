import React from 'react';
import './style/App.scss';
import Loadable from 'react-loadable';
import Loader from './components/Loader';

const Header = Loadable({
  loader: () => import('./components/Header'),
  loading: () => <Loader />
})
const RouterView = Loadable({
  loader: () => import('./components/Router/RouterView'),
  loading: () => <Loader />
})
const Footer = Loadable({
  loader: () => import('./components/Footer'),
  loading: () => <Loader />
})

function App() {
  return (
    <div className="App">
      <Header />
      <RouterView />
      <Footer />
    </div>
  );
}

export default App;
