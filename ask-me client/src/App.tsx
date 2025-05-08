// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Contexts/UserContext.tsx';
import SiteMap from './SiteMap.tsx';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <SiteMap />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
