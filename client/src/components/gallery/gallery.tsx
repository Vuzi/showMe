import CircularProgress from 'material-ui/CircularProgress'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import * as React from 'react'
import { Image } from '../../models/image'
import { imageUrl } from '../../utils/files'

export interface Props {
	images: Image[]
	loading: boolean
	onLoad: () => void
}

export class Gallery extends React.Component<Props, {}> {

	componentDidMount() {
		// Load all
		this.props.onLoad()
	}

	render() {
		if(this.props.loading)
			return <CircularProgress key='loading' size={80} thickness={5} color={'#002e7a'} />
		else
			return <div>
				<GridList
					cellHeight={180}
				>
					{ /*<Subheader>December</Subheader> */ }
					{
						this.props.images.map((image: Image) => (
							<GridTile
								key={image.id}
								title={image.title}
								subtitle={<span>{image.description}<br/><em>{image.tags.join(', ')}</em></span>}
							>
								<img src={imageUrl(image)} />
							</GridTile>
						))
					}
				</GridList>
			</div>
	}

}
