import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'

export class App extends React.Component<{}, undefined> {
	render() {
		const responseGoogle = (response: any) => {
			console.log(response);
		}

		return <Card className="login-card">
			<CardTitle title='Upload a file' subtitle='Drag & drop' />

			<CardText>
				<div style={{
					border: "dashed 4px lightgray",
					margin: 'auto',
					marginBottom: '10px',
					width: '500px',
					height: '250px',
					borderRadius: '30px',
					background: 'url(img/cloud.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'initial',
					backgroundPosition: 'center'
				}}>
				</div>
			</CardText>
		</Card>
	}
}
