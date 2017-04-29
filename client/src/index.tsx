import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ConnectApp from './components/connect/connectApp'
import { Title } from './components/title'
import UploaderApp from './components/upload/uploaderApp'
import { Image } from './models/image'
import rootReducer from './redux/reducers'
import {
  uploadAdd,
  uploadFailed,
  uploadRemove,
  uploadStart,
  uploadSuccess,
  uploadUpdate,
} from './redux/actions'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

const Login = () => (
  <Provider store={store}>
    <ConnectApp />
  </Provider>
)

const Upload = () => (
  <Provider store={store}>
    <UploaderApp />
  </Provider>
)

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Title />
        <Route path='/upload' exact component={ Upload }/>
        <Route path='/' exact component={ Login }/>
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
