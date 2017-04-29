import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import {UploadCard} from './uploadCard'
import {UploadFileCards} from './uploadFileCards'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	images: UploadStateImage[]
	onDroppedFile: (file: File) => void
	onRemoveImage: (image: UploadStateImage) => void
	onUploadImage: (image: UploadStateImage) => void
}

export class Uploader extends React.Component<Props, {}> {
	render() {

		return <div>
				<UploadCard onDroppedFile={this.props.onDroppedFile} />
				<UploadFileCards
					images={this.props.images}
					onRemoveImage={this.props.onRemoveImage}
					onUploadImage={this.props.onUploadImage}
				/>
			</div>
	}

}
