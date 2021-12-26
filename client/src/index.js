import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import App from './components/App'
import theme from './theme'
import { LibEMContext, libEM } from './lib'
import Prompt from './components/Prompt'

ReactDOM.render(
  <LibEMContext.Provider value={libEM}>
  <Prompt>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </Prompt>
  </LibEMContext.Provider>
  ,
  document.querySelector('#root')
);
