import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import * as React from 'react'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'



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
				<div
					onMouseOver={() => this.onDragEnter()}
					onMouseOut={() => this.onDragLeave()}
				>
					<Dropzone
						accept='video/*,image/*'
						onDrop={(accepted: File[], rejected: File[]) => this.onDrop(accepted, rejected)}
						style={style}
						onDragEnter={() => this.onDragEnter()}
						onDragLeave={() => this.onDragLeave()}
					/>
				</div>
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
