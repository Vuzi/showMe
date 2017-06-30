import {
	Card,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import AddIcon from 'material-ui/svg-icons/content/add'
import * as React from 'react'
import { Image } from '../../models/image'
import { imageUrl } from '../../utils/files'
import { PaperHoverable } from '../paperHoverable'
import { UrlTextField } from '../upload/urlTextField'

export interface Props {
	images: Image[]
	loading: boolean
	onLoad: () => void
}

export class GalleryDetail extends React.Component<{ image: Image }, { open: boolean }> {

	constructor(props: { image: Image }) {
		super(props)
		this.state = {
			open: true
		}
	}

	componentWillReceiveProps() {
		this.open()
	}

	close() {
		this.setState({ open : false })
	}

	open() {
		this.setState({ open : true })
	}

	render() {
		const {image} = this.props
		const {open} = this.state
		const url = imageUrl(image)

		// Close button
		const actions = [
			<FlatButton
				label="Close"
				primary={true}
				onTouchTap={() => this.close()}
			/>
		]

		// Prepare displayed media
		let media;
		if (image.url.indexOf('.webm') >= 0) {
			media = <video controls>
								<source src={url} type={'video/webm'} />
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
				<img src={url} style={imageStyle} />
			</div>
		}

		const tags = image.tags.length > 0 ? <div>
			<h6 style={{
				color: 'rgba(0, 0, 0, 0.3)',
				fontWeight: 'normal',
				
				fontSize: '90%',
				paddingBottom: '1px',
				marginBottom: '5px'
			}}>
				Tags
			</h6>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{
						image.tags.map((tag, index) => {
							return <Chip
									key={`tag-${tag}`}
									style={{ marginRight: '5px', marginTop: '3px' }}
								>
									{tag}
								</Chip>
						})
					}
			</div>
		</div> : <div />

		return <Dialog
				actions={actions}
				modal={false}
				open={open}
				bodyStyle={{ padding: 0 }}
				onRequestClose={() => this.close()}
			>
				<Card>
					<CardTitle title={image.title} />
					<CardMedia>
						{ media }
					</CardMedia>
					<CardText>
						<UrlTextField url={url} />
						{ tags }
					</CardText>
				</Card>
			</Dialog>
	}

}

export class Gallery extends React.Component<Props, { selectedImage: number }> {

	constructor(props: Props) {
		super(props)
		this.state = {
			selectedImage: -1
		}
	}

	componentDidMount() {
		// Load all
		this.props.onLoad()
	}

	selectImage(index: number) {
		this.setState({ selectedImage: index })
	}

	deselectImage() {
		this.setState({ selectedImage: -1 })
	}

	render() {
		const videoStyle: React.CSSProperties = {
			height: 'auto',
			transform: 'translateY(-50%)',
			position: 'relative',
			left: '0px',
			width: '100%',
			top: '50%'
		}

		const {loading, images} = this.props
		const {selectedImage} = this.state

		if(loading)
			return <CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} />
		else {
			const gallery = images.map((image, i) => {
				const featured = i % 3 == 2 && i > 0
				const onClick = () => this.selectImage(i)

				return <GridTile
					key={image.id}
					title={image.title}
					subtitle={<span>{image.description}<br/><em>{image.tags.join(', ')}</em></span>}
					containerElement={<div className={'gallery-image'} />}
					cols={featured ? 2 : 1}
					rows={featured ? 2 : 1}
					actionIcon={<IconButton onClick={onClick} ><AddIcon color="white" /></IconButton>}
				>
					{
						image.url.indexOf('.webm') >= 0 ? 
						// TODO handle video with a format field
						<video controls style={videoStyle}>
							<source src={imageUrl(image)} type={'video/webm'} />
						</video> :
						<img src={imageUrl(image)} />
					}
				</GridTile>
			})

			const dialog = selectedImage < 0 ?
				<span/> :
				<GalleryDetail image={images[selectedImage]} />

			return <div>
				<PaperHoverable>
					<Card>
						<CardText>
							<GridList cellHeight={180} >
								{ gallery }
							</GridList>
						</CardText>
					</Card>
				</PaperHoverable>
				{ dialog }
			</div>
		}
	}

}
