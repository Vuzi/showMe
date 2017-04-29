import * as Dropzone from 'react-dropzone'
import * as FileImage from 'react-file-image'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	image: UploadStateImage,
	onRemove: () => void
}

export class UploadFileCard extends React.Component<Props, {}> {
	render() {
		const {file, image} = this.props.image
    const fileURL = window.URL.createObjectURL(file)

		const cardStyle: React.CSSProperties = {
			marginTop: '15px'
		}

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

		return <div>
				<Card style={cardStyle}>
				<CardTitle title={image.title} subtitle={file.type} />
				<CardMedia>
					{ media }
				</CardMedia>
				<CardText>
					<TextField
						defaultValue={image.title}
						floatingLabelText="Image title"
						fullWidth={true}
					/><br/>
					<TextField
						defaultValue={image.filename}
						floatingLabelText="Image URL"
						fullWidth={true}
					/><br/>
				<TextField
					floatingLabelText="Image description"
					multiLine={true}
					fullWidth={true}
					rows={2}
				/><br />
				</CardText>
				<CardActions >
					<RaisedButton label="Upload" />
					<FlatButton label="Remove" onClick={() => this.props.onRemove()} />
				</CardActions>
			</Card>
		</div>
	}

}
