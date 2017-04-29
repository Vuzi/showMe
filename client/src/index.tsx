import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { applyMiddleware, createStore } from 'redux'
import {
  uploadAdd,
  uploadFailed,
  uploadRemove,
  uploadStart,
  uploadSuccess,
  uploadUpdate,
} from './redux/actions'

import { Image } from './models/image'
import { Login } from './components/login'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { Title } from './components/title'
import { Upload } from './components/upload'
import UploaderApp from './components/upload/uploaderApp'
import rootReducer from './redux/reducers'
import thunkMiddleware from 'redux-thunk'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

const App = () => (
  <MuiThemeProvider>
    <div>
      <Title />
      <Provider store={store}>
        <UploaderApp />
      </Provider>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
