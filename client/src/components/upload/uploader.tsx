import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'
import { UploadCard } from './uploadCard'
import { UploadFileCards } from './uploadFileCards'
import { Image } from '../../models/image'
import { UploadStateImage } from '../../redux/reducers'

export interface Props {
	images: UploadStateImage[]
	onDroppedFile: (file: File) => void
	onUploadImage: (image: Image, file: File) => void
	onRemoveImage: (image: Image) => void
	onEditImage: (image: Image) => void
}

export class Uploader extends React.Component<Props, {}> {

	render() {
		return <div>
				<UploadCard onDroppedFile={this.props.onDroppedFile} />
				<UploadFileCards
					images={this.props.images}
					onRemoveImage={this.props.onRemoveImage}
					onUploadImage={this.props.onUploadImage}
					onEditImage={this.props.onEditImage}
				/>
			</div>
	}

}
