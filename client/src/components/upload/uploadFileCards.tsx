import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import {UploadFileCard} from './uploadFileCard'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	images: UploadStateImage[]
}

export class UploadFileCards extends React.Component<Props, {}> {
	render() {

		const fileCards = this.props.images.map((image) => {
			return <UploadFileCard image={image} />
		})

		return <div>
			{ fileCards }
			</div>
	}

}
