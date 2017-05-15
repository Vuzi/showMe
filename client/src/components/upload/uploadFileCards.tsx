import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import * as React from 'react'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'
import { CSSTransitionGroup } from 'react-transition-group'
import { UploadFileCard } from './uploadFileCard'
import { Image } from '../../models/image'
import { UploadStateImage } from '../../redux/reducers'
import { PaperHoverable } from '../paperHoverable'

export interface Props {
	images: UploadStateImage[]
	onRemoveImage: (image: Image) => void
	onUploadImage: (image: Image, file: File) => void
	onEditImage: (image: Image) => void
}

export class UploadFileCards extends React.Component<Props, {}> {
	onClear() {
		this.props.images.forEach((i) => this.props.onRemoveImage(i.image))
	}

	render() {
		const style: React.CSSProperties = {
			maxWidth: '700px',
			margin: 'auto',
			marginTop: '15px'
		}

		const lastCardStyle: React.CSSProperties = {
			marginTop: '15px'
		}

		const fileCards = this.props.images.map((image) => {
			const onRemove = () => {
				this.props.onRemoveImage(image.image)
			}

			const onUpload = () => {
				this.props.onUploadImage(image.image, image.file)
			}

			const onChangeImage = (newImage: Image) => {
				this.props.onEditImage(newImage)
			}

			return <UploadFileCard
								image={image}
								onRemove={onRemove}
								onUpload={onUpload}
								onChangeImage={onChangeImage}
								key={image.image.id}
							/>
		})

		if (fileCards.length > 1) {
			fileCards.push(<PaperHoverable style={lastCardStyle} key='0'>
					<Card>
						<CardActions >
							<RaisedButton label="Upload All" primary={true} />
							<FlatButton label="Clear" onClick={() => this.onClear()} />
						</CardActions>
					</Card>
				</PaperHoverable>)
		}

		return <div style={style}>
			<CSSTransitionGroup
				transitionName="uploadCardFile"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				transitionEnter={true}
				transitionLeave={true}
			>
				{ fileCards }
			</CSSTransitionGroup>
		</div>
	}

}
