import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import * as React from 'react'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { LoginState } from '../../redux/reducers'
import { PaperHoverable } from '../paperHoverable'


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

	googleElement: any = null

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
		const { connected, connecting, redirectTo } = this.props.login

		if (connected) {
			const redirectToFixed = redirectTo ? redirectTo.indexOf('/login') === 0 ? '/upload' : redirectTo : '/upload'
			return <Redirect to={ redirectToFixed } />
		} else
			return (
				<Card className="login-card">
					<CardTitle titleColor='grey' />
					<CardText style={{ textAlign: 'center' }}>
						You need to be logged in to upload images
					</CardText>
					<CardText style={{ paddingBottom: '40px', textAlign: 'center' }}>
							{
								connecting ?
								<CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} /> :
								<span>
									<RaisedButton
										label="Login with Google"
										icon={<img src="img/google_logo.png" height={25} style={{ marginRight: '1px', marginTop: '-3px' }} />} // TODO use better icon ?
										primary={false}
										onClick={() => { this.googleElement.signIn() }}
									/>
									<GoogleLogin
										key='googleAuth'
										ref={(input: any) => this.googleElement = input}
										disabled={this.props.login.connecting}
										clientId={process.env.GOOGLE_API_KEY}
										buttonText="Login with Google"
										onSuccess={(event: any) => this.responseGoogle(event)}
										onFailure={() => this.showError()}
										style={{  // Hide the button
												opacity: 0,
												position: 'fixed',
												top: '-100px'
											}}
									/>
								</span>
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
			)
	}

}
