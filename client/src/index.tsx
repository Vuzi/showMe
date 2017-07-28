import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconHistory from 'material-ui/svg-icons/action/history'
import IconLock from 'material-ui/svg-icons/action/lock-open'
import IconUpload from 'material-ui/svg-icons/file/file-upload'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
  } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { AppBar } from './components/appBar'
import ConnectApp from './components/connect/connectApp'
import GalleryApp from './components/gallery/galleryApp'
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

// Authentication helper TODO move
interface RequireAuthElementProps extends LoginState {
  testLogin: () => {}
}

class RequireAuthElement extends React.Component<RequireAuthElementProps, {}> {
  componentDidMount() {
    // Test if we need to test the connecion
    if(!this.props.connected && !this.props.connecting) {
      console.log(`needs to test login ! => `)
      this.props.testLogin()
    }
  }

  render() {
    const { connected } = this.props

    // Either show the protected component, or the login form
    if (connected)
      return this.props.children as JSX.Element
    else
      return <Redirect to={ '/login' }/> // Login will handle the redirection
  }
}

const RequireAuthRedux = connect((state: { upload: UploadState, login: LoginState }) => {
  return state.login
}, (dispatch: (action: Action<any>) => any, ownProps: { redirectTo?: string }) => {
  return {
    testLogin : () => {
      dispatch(loginTest(ownProps.redirectTo))
    }
  }
})(RequireAuthElement as any) // Makes TS 2.4 happy

const RequireAuth = (props: { redirectTo: string, children?: JSX.Element }) => {
  return (<Provider store={store}>
    <RequireAuthRedux redirectTo={props.redirectTo} >
      {props.children}
    </RequireAuthRedux>
  </Provider>)
}

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

const Gallery = () => (
  <Provider store={store}>
    <GalleryApp />
  </Provider>
)

const AppContent = (props: RouteComponentProps<any>) => (
  <RequireAuth redirectTo={props.location.pathname} >
    <div>
      <AppBar history={props.history} tabs={
          [
            {
              label: 'Upload',
              route : '/upload',
              icon : <IconUpload/>
            },
            {
              label: 'Recents',
              route : '/gallery',
              icon : <IconHistory/>
            },
            {
              label: 'Log out',
              route : '/logout',
              icon : <IconLock/>
            }
          ]
        } current={props.location.pathname} />
      <Route path='/upload' component={ Upload }/>
      <Route path='/gallery' component={ Gallery }/>
      <Route path='/logout' component={ () => <h1>Log out TODO</h1> }/>
    </div>
  </RequireAuth>
)

const wrapperStyle: React.CSSProperties = {
  maxWidth: '700px',
  margin: 'auto'
}

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div style={wrapperStyle}>
        <Title />
        <Route path='/login' exact component={ Login }/>
        <Route component={ AppContent }/>
      </div>
    </MuiThemeProvider>
  </Router>
);

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
