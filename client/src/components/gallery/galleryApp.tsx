import { connect } from 'react-redux'
import { Gallery } from './gallery'
import { Action, loadGallery } from '../../redux/actions'
import { GalleryState } from '../../redux/reducers'

const mapStateToProps = (state: { gallery: GalleryState }) => {
  return {
    images: state.gallery.images,
		loading: state.gallery.loading
	}
}

const mapDispatchToProps = (dispatch: (action: Action<any>) => any) => {
  return {
    needRefresh: (filter: string[]) => {
      dispatch(loadGallery(filter))
    }
  }
}


const GalleryApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)

export default GalleryApp
