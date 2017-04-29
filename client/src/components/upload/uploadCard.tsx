import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import Snackbar from 'material-ui/Snackbar'

export interface Props {
	onDroppedFile: (file: File) => void
}

interface State {
	isHovered: boolean
	showError: boolean
}

export class UploadCard extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      isHovered: false,
			showError: false
    }
  }

	onDrop(acceptedFiles: File[], rejectedFiles: File[]) {
		acceptedFiles.forEach(this.props.onDroppedFile)
		this.setState({
			isHovered : false,
			showError: rejectedFiles.length > 0
		})
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

	hideError() {
    this.setState({
      showError: false
    })
	}

	render() {
		const style: React.CSSProperties = {
			border: 'dashed 4px',
			borderColor: this.state.isHovered ? '#C1C1C1' : '#f7f7f7',
			margin: 'auto',
			marginBottom: '10px',
			maxWidth: '500px',
			height: '250px',
			borderRadius: '30px',
			background: 'url(img/cloud.png)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'initial',
			backgroundPosition: 'center',
			cursor: 'pointer'
		}

		return <Card className="login-card">
			<CardTitle title='Upload a file' subtitle='Drag &amp; drop' />
			<CardText>
				<Dropzone
					accept='video/*,image/*'
					onDrop={this.onDrop.bind(this)}
					style={style}
					onDragEnter={this.onDragEnter.bind(this)}
					onDragLeave={this.onDragLeave.bind(this)}
				/>
        <Snackbar
          open={this.state.showError}
          message='Only images and webm can be uploaded'
          autoHideDuration={4000}
          onRequestClose={this.hideError}
        />
			</CardText>
		</Card>
	}

}
