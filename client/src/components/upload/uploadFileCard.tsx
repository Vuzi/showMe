import * as Dropzone from 'react-dropzone'
import * as FileImage from 'react-file-image'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	image: UploadStateImage
	onRemove: () => void
	onUpload: () => void
}

export class UploadFileCard extends React.Component<Props, {}> {
	render() {
		const {file, image, uploading, uploaded, percentUpload} = this.props.image
    const fileURL = window.URL.createObjectURL(file)

		const cardStyle: React.CSSProperties = {
			marginTop: '15px'
		}

		const loaderStyle: React.CSSProperties = {
			borderRadius: '0px'
		}

		// Prepare displayed media
		let media;
		if (/^video/.test(file.type)) {
			media = <video controls>
								<source src={fileURL} type={file.type} />
							</video>
		} else {
			const imageBackgroundStyle: React.CSSProperties = {
				backgroundImage: 'url(img/footer_lodyas.png)',
				textAlign: 'center'
			}

			const imageStyle: React.CSSProperties = {
				marginBottom: '-4px',
				maxWidth: '100%',
				maxHeight: '450px'
			}

			media = <div style={imageBackgroundStyle} >
				<img src={fileURL} style={imageStyle} />
			</div>
		}

		// Prepare progress bar
		const progress = uploading || uploaded ?
			<LinearProgress mode="determinate" value={percentUpload} style={loaderStyle} /> :
			<span />

		return <div>
				<Card style={cardStyle}>
				<CardTitle title={image.title} subtitle={file.type} />
				<CardMedia>
					{ media }
      		{ progress }
				</CardMedia>
				<CardText>
					<TextField
						defaultValue={image.title}
						floatingLabelText='Image title'
						fullWidth={true}
						disabled={uploading || uploaded}
					/><br/>
					<TextField
						defaultValue={image.url}
						floatingLabelText='Image URL'
						fullWidth={true}
						disabled={uploading || uploaded}
					/><br/>
					<TextField
						floatingLabelText='Image description'
						multiLine={true}
						fullWidth={true}
						disabled={uploading || uploaded}
						rows={2}
					/><br />
				</CardText>
				<CardActions >
					<RaisedButton
						label='Upload'
						onClick={() => this.props.onUpload()}
						disabled={uploading || uploaded}
					/>
					<FlatButton
						label='Remove'
						onClick={() => this.props.onRemove()}
						disabled={uploading}
					/>
				</CardActions>
			</Card>
		</div>
	}

}
