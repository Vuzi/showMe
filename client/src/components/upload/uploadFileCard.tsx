import * as Dropzone from 'react-dropzone'
import * as FileImage from 'react-file-image'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	image: UploadStateImage
}

export class UploadFileCard extends React.Component<Props, {}> {
	render() {

		const style = {
			width: '700px',
			margin: 'auto'
		}

		return <Card style={style}>
			<CardTitle title='Upload a file' subtitle='Drag &eamp; drop' />
			<CardMedia>

      	<FileImage file={this.props.image.file} />
			</CardMedia>
			<CardText>
				{ `File name: ${this.props.image.file.name}` }
			</CardText>
		</Card>
	}

}
