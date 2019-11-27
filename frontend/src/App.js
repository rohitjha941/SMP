import React from 'react';
import './style/App.scss';
import Header from './components/Header';
import RouterView from './components/Router/RouterView';


function App() {
  return (
    <div className="App">
      <Header />
      <RouterView />
    </div>
  );
}

export default App;
