import * as Dropzone from 'react-dropzone'
import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import {CSSTransitionGroup} from 'react-transition-group'
import FlatButton from 'material-ui/FlatButton'
import GoogleLogin from 'react-google-login'
import RaisedButton from 'material-ui/RaisedButton'
import {UploadFileCard} from './uploadFileCard'
import {UploadStateImage} from '../../redux/reducers'

export interface Props {
	images: UploadStateImage[]
	onRemoveImage: (image: UploadStateImage) => void
}

export class UploadFileCards extends React.Component<Props, {}> {
	onClear() {
		this.props.images.forEach((i) => this.props.onRemoveImage(i))
	}

	render() {
		const style: React.CSSProperties = {
			maxWidth: '700px',
			margin: 'auto',
			marginTop: '15px'
		}

		const lastCardStyle: React.CSSProperties = {
			marginTop: '15px',
			marginBottom: '40px'
		}

		const fileCards = this.props.images.map((image) => {
			const onRemove = () => {
				this.props.onRemoveImage(image)
			}
			return <UploadFileCard image={image} onRemove={onRemove} key={image.image.id} />
		})

		if (fileCards.length > 1) {
			fileCards.push(<div style={lastCardStyle} key='0'>
					<Card>
						<CardActions >
							<RaisedButton label="Upload All" primary={true} />
							<FlatButton label="Clear" onClick={() => this.onClear()} />
						</CardActions>
					</Card>
				</div>)
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
