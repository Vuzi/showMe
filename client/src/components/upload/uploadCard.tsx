import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'

export interface Props {
	onDroppedFile: (file: File) => void
}

interface State {
	isHovered: boolean
}

export class UploadCard extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      isHovered: false
    }
  }

	onDrop(acceptedFiles: File[]) {
		console.log(acceptedFiles)
		acceptedFiles.forEach(this.props.onDroppedFile)
	}

	onDragEnter() {
		this.setState({
			isHovered : true
		})
	}

	onDragLeave() {
		this.setState({
			isHovered : false
		})
	}

	render() {
		const style = {
			border: "dashed 4px",
			borderColor: this.state.isHovered ? 'lightGray' : '#c1c1c1',
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
			<CardTitle title='Upload a file' subtitle='Drag &eamp; drop' />
			<CardText>
				<Dropzone
					onDrop={this.onDrop.bind(this)}
					style={style}
					onDragEnter={this.onDragEnter.bind(this)}
					onDragLeave={this.onDragLeave.bind(this)}
				>
					<p>Try dropping some files here, or click to select files to upload.</p>
				</Dropzone>
			</CardText>
		</Card>
	}

}
