import {
	Card,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import SearchIcon from 'material-ui/svg-icons/action/search'
import AddIcon from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import { Debounce } from 'react-throttle'
import { Image } from '../../models/image'
import { imageUrl } from '../../utils/files'
import { PaperHoverable } from '../paperHoverable'
import { UrlTextField } from '../upload/urlTextField'

export class GallerySearch extends React.Component<{ onChange: (value: string) => void }, {  }> {

	onChange(value: string) {
		this.props.onChange(value)
	}

	render() {
		return <div>
			<Debounce time="400" handler="onChange">
				<TextField
					hintText="Search by title or tag"
					style={{ marginLeft : '20px'}}
					underlineShow={false}
					fullWidth={true}
					onChange={(_, value) => this.onChange(value)}
				/>
			</Debounce>
			<SearchIcon style={{
					float: 'right',
					marginTop: '-35px',
					marginRight: '11px'
				}}
			/>
		</div>
	}

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

export interface Props {
	images: Image[]
	loading: boolean
	needRefresh: (filter: string[]) => void
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
		this.props.needRefresh([])
	}

	filter(values: string) {
		const filter = values.split(' ').map(s => s.trim()).filter(s => s.length > 0)
		this.props.needRefresh(filter)
		this.deselectImage()
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

		const dialog = selectedImage < 0 ?
			<span/> :
			<GalleryDetail image={images[selectedImage]} />

		const loader = <CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} style={{marginLeft: 'calc(50% - 40px)'}} />

		const galleryContent = images.map((image, i) => {
			const featured =
				(i + 1) % 3 === 0                          // Every third images
				|| (images.length - 1 == i && i % 3 === 0) // Or every last image ending with a space next
				|| images.length <= 1                      // Or is there's only one image
			const onClick = () => this.selectImage(i)

			const style: React.CSSProperties = {
				boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
			}

			return <GridTile
				key={image.id}
				title={image.title}
				subtitle={<span>{image.description}<br/><em>{image.tags.join(', ')}</em></span>}
				containerElement={<div className={'gallery-image'} />}
				cols={featured ? 2 : 1}
				rows={featured ? 2 : 1}
				actionIcon={<IconButton onClick={onClick} ><AddIcon color="white" /></IconButton>}
				style={style}
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

		const emptyGalleryStyle: React.CSSProperties = {
			fontSize: '120%',
			color: '#C1C1C1',
			display: 'block',
			textAlign: 'center'
		}

		const gallery = galleryContent.length > 0 ?
			<GridList cellHeight={180} >
				{ galleryContent }
			</GridList> :
			<span style={emptyGalleryStyle}>No image found :(</span>

		return <div>
			<PaperHoverable default={1} >
				<Card>
					<GallerySearch onChange={(value) => this.filter(value)} />
					<Divider />
					<CardText>
						{
							loading ? loader : gallery
						}
					</CardText>
				</Card>
			</PaperHoverable>
			{ dialog }
		</div>
	}

}
