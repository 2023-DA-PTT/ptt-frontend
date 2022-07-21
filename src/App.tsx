import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footarea from './components/Footarea/Footarea';
import Header from './components/Header/Header';

function App() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footarea/>
    </>
  );
}

export default App;
