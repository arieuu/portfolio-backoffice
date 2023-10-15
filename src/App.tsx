import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const App = () => {

  return(
    <>
      <Outlet />
    </>
  )

}

export default App;