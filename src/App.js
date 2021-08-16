import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import customTheme from './theme';
//PAGES
import Home from './pages/home';
//REDUX
import {Provider} from 'react-redux';
import store from './redux/store';


const App = () => {

  

  return (
    <ThemeProvider theme={customTheme}>

    <Provider store={store}>
      <Home/>
    </Provider>
          
    </ThemeProvider>

  );
}

export default App;
