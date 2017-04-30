import Avatar from 'material-ui/Avatar'
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import LinearProgress from 'material-ui/LinearProgress'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import OpenIcon from 'material-ui/svg-icons/action/open-in-new'
import ErrorIcon from 'material-ui/svg-icons/content/clear'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'
import * as Dropzone from 'react-dropzone'
import * as FileImage from 'react-file-image'
import GoogleLogin from 'react-google-login'
import { CSSTransitionGroup } from 'react-transition-group'
import { Image } from '../../models/image'
import { UploadStateImage } from '../../redux/reducers'

export interface Props {
	image: UploadStateImage
	onRemove: () => void
	onUpload: () => void
	onChangeImage: (image: Image) => void
}

export class UploadFileCard extends React.Component<Props, {}> {

	onChangeTitle(title: string) {
		this.props.onChangeImage({
			...this.props.image.image,
			title
		})
	}

	onChangeURL(url: string) {
		this.props.onChangeImage({
			...this.props.image.image,
			url
		})
	}

	onChangeDescription(description: string) {
		this.props.onChangeImage({
			...this.props.image.image,
			description
		})
	}

	render() {
		const {file, image, uploading, uploaded, percentUpload, error} = this.props.image
    const fileURL = window.URL.createObjectURL(file)

		const cardStyle: React.CSSProperties = {
			marginTop: '15px'
		}

		const loaderStyle: React.CSSProperties = {
			borderRadius: '0px'
		}

		const iconStyle: React.CSSProperties = {
			float: 'right',
			marginRight: '-30px',
			marginTop: '-85px'
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
		const progress = uploading || uploaded || error ?
			<LinearProgress mode="determinate" value={percentUpload} style={loaderStyle} /> :
			<span />

		// Prepare badge
		let badge = <span key='no-badge' />
		if (uploaded) {
			badge = <div key={`badge-ok-${image.id}`}>
				<Paper style={iconStyle} zDepth={3} circle={true} >
					<Avatar
						icon={<CheckIcon />}
						color={'white'}
						backgroundColor={'green'}
						size={50}
					/>
				</Paper>
			</div>
		} else if (error) {
			badge = <div key={`badge-ko-${image.id}`}>
				<Paper style={iconStyle} zDepth={3} circle={true} >
					<Avatar
						icon={<ErrorIcon />}
						color={'white'}
						backgroundColor={'#BC0000'}
						size={50}
					/>
				</Paper>
			</div>
		}

		// Prepare URL
		let textFieldUrl = <span key='no-url' />
		if (uploaded) {
			const style = {
				float: 'right',
				width: 'auto',
				marginTop: '30px',
				cursor: 'pointer'
			}

			// Construct the file path..
			const location = window.location
			const port = location.port === '80' ? '' : `:${location.port}`
			const url = `${location.protocol}//${location.hostname}${port}/api/image/raw/${image.url}`
			// TODO deplace in some utils file

			textFieldUrl = <div key={`url-${image.id}`}>
				<TextField
					defaultValue={url}
					floatingLabelText='Image URL'
					style={{ width: 'calc(100% - 70px)' }}
				/>
				<div style={style} >
					<OpenIcon fontSize='10' onClick={() => window.open(url, '_blank')} style={{ marginRight: '5px' }} />
					<CopyToClipboard text={url} onCopy={() => console.log('copied')}>
						<CopyIcon fontSize='10' />
					</CopyToClipboard>
				</div>
			</div>
		}

		return <div>
				<Card style={cardStyle}>
				<CardTitle title={image.title} subtitle={file.type}>
					<CSSTransitionGroup
						transitionName='uploadCardUpload'
						transitionEnterTimeout={300}
						transitionEnter={true}
					>
						{ badge }
					</CSSTransitionGroup>
				</CardTitle>
				<CardMedia>
					{ media }
      		{ progress }
				</CardMedia>
				<CardText>
					<CSSTransitionGroup
						transitionName='uploadCardUpload'
						transitionEnterTimeout={300}
						transitionEnter={true}
					>
						{ textFieldUrl }
					</CSSTransitionGroup>
					<TextField
						defaultValue={image.title}
						floatingLabelText='Image title'
						fullWidth={true}
						disabled={uploading || uploaded}
						onChange={(_, newValue: string) => this.onChangeTitle(newValue)}
					/><br/>
					<TextField
						defaultValue={image.url}
						floatingLabelText='Image URL'
						fullWidth={true}
						disabled={uploading || uploaded}
						onChange={(_, newValue: string) => this.onChangeURL(newValue)}
					/><br/>
					<TextField
						floatingLabelText='Image description'
						multiLine={true}
						fullWidth={true}
						disabled={uploading || uploaded}
						rows={2}
						onChange={(_, newValue: string) => this.onChangeDescription(newValue)}
					/><br />
				</CardText>
				<CardActions>
					<RaisedButton
						label='Upload'
						onClick={() => this.props.onUpload()}
						disabled={uploading || uploaded}
						backgroundColor='#002e7a'
						labelColor='white'
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
