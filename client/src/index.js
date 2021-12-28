import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Prompt from './components/Prompt'
import { libEM, LibEMContext } from './lib'
import theme from './theme'

ReactDOM.render(
  <LibEMContext.Provider value={libEM}>
  <SnackbarProvider maxSnack={5}>
  <Prompt>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </Prompt>
  </SnackbarProvider>
  </LibEMContext.Provider>
  ,
  document.querySelector('#root')
);
