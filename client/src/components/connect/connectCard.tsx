import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import * as React from 'react'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { LoginState } from '../../redux/reducers'

export interface Props {
	onLogin: (token: string) => void
	login: LoginState
}

interface State {
	showError: boolean
}

export class ConnectCard extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
			showError: false
    }
  }

	componentWillReceiveProps(props: Props) {
		if (props.login.error)
			this.showError()
	}

	showError() {
    this.setState({
      showError: true
    })
	}

	hideError() {
    this.setState({
      showError: false
    })
	}

	responseGoogle(response: any) {
		this.props.onLogin(response.tokenId)
	}

	render() {
		const { connected, connecting } = this.props.login

		if (connected)
			return <Redirect to={{ pathname: '/upload' }} />
		else
			return <Card className="login-card">
				<CardTitle titleColor='grey' />
				<CardText style={{ textAlign: 'center' }}>
					You need to be logged in to upload images
				</CardText>
				<CardText style={{ paddingBottom: '40px', textAlign: 'center' }}>
						{
							connecting ?
							<CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} /> :
							<GoogleLogin
								key='googleAuth'
								disabled={this.props.login.connecting}
								clientId='44077302857-hukep14pmirdvcth0utgetfpjmi8rjo7.apps.googleusercontent.com'
								buttonText="Login with Google"
								onSuccess={(event: any) => this.responseGoogle(event)}
								onFailure={() => this.showError()}
							/>
						}
				</CardText>
				<Snackbar
					open={this.state.showError}
					message={
						this.props.login.error ?
							'Login failed... Something went wrong server-side!' :
							'Login failed... Did you accepted the app?'
					}
					autoHideDuration={7000}
					onRequestClose={() => this.hideError()}
				/>
			</Card>
	}

}
