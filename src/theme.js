import {createTheme} from '@material-ui/core/styles';

const customTheme = createTheme({
    palette: {
      primary: {
        main: '#11B0C8',
        contrastText: 'white',
      },
      secondary: {
        main: '#FF6600', //orange
        contrastText: 'white',
      },
      regular: {
        main: '#73C2FB' //maya
      }
    }
  })


export default customTheme;