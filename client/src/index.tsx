import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { Login } from './components/login'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Title } from './components/title'
import { Upload } from './components/upload'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <Title />
      <Login />
      <Upload />
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
