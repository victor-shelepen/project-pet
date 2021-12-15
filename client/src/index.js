import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import App from './components/App'
import theme from './theme'
import { LibEMContext, libEM } from './lib'

ReactDOM.render(
  <LibEMContext.Provider value={libEM}>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </LibEMContext.Provider>
  ,
  document.querySelector('#root')
);
