import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'

export interface HelloProps {
	compiler: string
	framework: string
}

export class Login extends React.Component<{}, undefined> {
	render() {
		const responseGoogle = (response: any) => {
			console.log(response);
		}

		return <Card className="login-card">
			<CardTitle title="Show me some pixel" titleColor='grey' />
			<CardText style={{ textAlign: 'center' }}>
				You need to be logged to upload images
			</CardText>

			<CardText>
				<GoogleLogin
					clientId='44077302857-hukep14pmirdvcth0utgetfpjmi8rjo7.apps.googleusercontent.com'
					buttonText="Login with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
				/>
			</CardText>
		</Card>
	}
}
