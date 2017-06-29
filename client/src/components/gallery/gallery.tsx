import { Card, CardText } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import * as React from 'react'
import { Image } from '../../models/image'
import { imageUrl } from '../../utils/files'
import { PaperHoverable } from '../paperHoverable'
export interface Props {
	images: Image[]
	loading: boolean
	onLoad: () => void
}

export class GalleryImage extends React.Component<{ image: Image, featured: boolean }, {}> {

	render() {
		const {image, featured} = this.props
		
		return <GridTile
				key={image.id}
				title={image.title}
				subtitle={<span>{image.description}<br/><em>{image.tags.join(', ')}</em></span>}
				containerElement={<div className={'gallery-image'} />}
				cols={2}
				rows={2}
			>
				<img src={imageUrl(image)} />
			</GridTile>
	}

}

export class Gallery extends React.Component<Props, {}> {

	componentDidMount() {
		// Load all
		this.props.onLoad()
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

		if(this.props.loading)
			return <CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} />
		else
			return <PaperHoverable>
				<Card><CardText>
					<GridList
						cellHeight={180}
					>
						{
							this.props.images.map((image, i) => {
								const featured = i % 3 == 2 && i > 0
								return <GridTile
										key={image.id}
										title={image.title}
										subtitle={<span>{image.description}<br/><em>{image.tags.join(', ')}</em></span>}
										containerElement={<div className={'gallery-image'} />}
										cols={featured ? 2 : 1}
										rows={featured ? 2 : 1}
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
						}
					</GridList>
				</CardText></Card>
			</PaperHoverable>
	}

}
