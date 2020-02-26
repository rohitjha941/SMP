import React, {useState, useEffect} from 'react';
import './style/App.scss';
import Loadable from 'react-loadable';
import Loader from './components/Loader';

var methods = require('./api/methods/');

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
  const [events, setEvents] = useState([]);
  const [team,setTeam] = useState([]);
  const [mentors,setMentors] = useState([]);

  const fetchBlogsIfEmpty = () => {
    if (!blogs || blogs.length === 0) {
        methods.getBlogs().then(data => setBlogs(data));
    }
  }
  const fetchEventsIfEmpty = () => {
    if (!events || events.length === 0) {
        methods.getEvents().then(data => setEvents(data));
    }
  }
  const fetchTeamIfEmpty = () => {
    if (!team || team.length === 0) {
        methods.getTeam().then(data => setTeam(data));
    }
  }
  const fetchMentorsIfEmpty = () => {
    if (!mentors || mentors.length === 0) {
        methods.getMentors().then(data => setMentors(data));
    }
  }

  useEffect(() => {
    fetchBlogsIfEmpty();
    fetchEventsIfEmpty();
    // fetchTeamIfEmpty();
    // fetchMentorsIfEmpty();
  });

  return (
    <div className="App">
      <Header />
      <div className="router-footer-container">
        <RouterView blogs={blogs} events={events} team={team} mentors={mentors}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
