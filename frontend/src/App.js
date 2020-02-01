import React, {useState, useEffect} from 'react';
import './style/App.scss';
import Loadable from 'react-loadable';
import Loader from './components/Loader';

import getBlogs from 'api/methods/getBlogs';

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
  const [blogs, setBlogs] = useState([]);

  const fetchBlogsIfEmpty = () => {
    if (!blogs || blogs.length === 0) {
        getBlogs().then(data => setBlogs(data));
    }
  }

  useEffect(() => {
    fetchBlogsIfEmpty();
  });

  return (
    <div className="App">
      <Header />
      <div className="router-footer-container">
        <RouterView blogs={blogs}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
