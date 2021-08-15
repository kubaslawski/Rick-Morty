import React from 'react';
import './App.css';
//PAGES
import Home from './pages/home';
//REDUX
import {Provider} from 'react-redux';
import store from './redux/store';


const App = () => {

  

  return (
    <Provider store={store}>
      <Home/>
    </Provider>

  );
}

export default App;
