import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'

export interface HelloProps {
	compiler: string
	framework: string
}

export class Upload extends React.Component<{}, undefined> {
	onDrop(acceptedFiles: any[]) {
		console.log(acceptedFiles)
	}

	render() {
		const style = {
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

				<Dropzone onDrop={this.onDrop.bind(this)} style={style}>
					<p>Try dropping some files here, or click to select files to upload.</p>
				</Dropzone>
			</CardText>
		</Card>
	}
}
