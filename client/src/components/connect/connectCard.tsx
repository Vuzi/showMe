import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import {LoginState} from '../../redux/reducers'
import Snackbar from 'material-ui/Snackbar'

export interface Props {
	onLogin: () => void
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

	hideError() {
    this.setState({
      showError: false
    })
	}

	responseGoogle(response: any) {
		console.log(response);
	}

	render() {

		return <Card className="login-card">
			<CardTitle title="Show me some pixel" titleColor='grey' />
			<CardText style={{ textAlign: 'center' }}>
				You need to be logged in to upload images
			</CardText>

			<CardText>
				<GoogleLogin
					clientId='44077302857-hukep14pmirdvcth0utgetfpjmi8rjo7.apps.googleusercontent.com'
					buttonText="Login with Google"
					onSuccess={(event: any) => this.responseGoogle(event)}
					onFailure={(event: any) => this.responseGoogle(event)}
				/>
			</CardText>
		</Card>
	}

}
