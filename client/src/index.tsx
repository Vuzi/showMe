import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
  } from 'react-router-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ConnectApp from './components/connect/connectApp'
import { Title } from './components/title'
import UploaderApp from './components/upload/uploaderApp'
import { Image } from './models/image'
import rootReducer from './redux/reducers'
import { LoginState, UploadState } from './redux/reducers'
import {
  loginTest,
	Action,
} from './redux/actions'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

// Test is we are already connected
store.dispatch(loginTest())

// Authentication helper TODO move
class RequireAuthElement extends React.Component<LoginState, {}> {
  render() {
    const { connected } = this.props

    if (connected)
      return this.props.children as JSX.Element
    else
      return <Redirect to={{ pathname: '/login' }} />
  }
}

const RequireAuthRedux = connect((state: { upload: UploadState, login: LoginState }) => {
  return state.login
})(RequireAuthElement)

const RequireAuth = (props: {children?: JSX.Element[]}) => (
  <Provider store={store}>
    <RequireAuthRedux>
      {props.children}
    </RequireAuthRedux>
  </Provider>
)

const Login = () => (
  <Provider store={store}>
    <ConnectApp />
  </Provider>
)

const Upload = () => (
  <RequireAuth>
    <Provider store={store}>
      <UploaderApp />
    </Provider>
  </RequireAuth>
)

const wrapperStyle: React.CSSProperties = {
  maxWidth: '700px',
  margin: 'auto'
}

const App = () => (
  <MuiThemeProvider>
    <div style={wrapperStyle}>
      <Title />
      <Router>
        <Switch>
          <Route path='/'exact component={ Upload }/>
          <Route path='/upload'exact component={ Upload }/>
          <Route path='/login' exact component={ Login }/>
          { /*<Route component={ NotFound }/> TODO */ }
        </Switch>
      </Router>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
