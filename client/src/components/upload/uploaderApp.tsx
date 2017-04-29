import * as uuid from 'uuid'

import {
	Action,
	uploadAdd,
	uploadRemove,
} from '../../redux/actions'
import {LoginState, UploadState} from '../../redux/reducers'

import {Image} from '../../models/image'
import {UploadStateImage} from '../../redux/reducers'
import {Uploader} from './uploader'
import {connect} from 'react-redux'

const mapStateToProps = (state: { upload: UploadState, login: LoginState }) => {
  return {
    images: state.upload.images
	}
}

const mapDispatchToProps = (dispatch: (action: Action<any>) => any) => {
  return {
    onDroppedFile: (file: File) => {
			const now = new Date()
			const newImage: Image = {
				id: uuid(),
				creation: now,
				modification: now,
				description: '',
				filename: file.name,
				title: file.name,
				tags: [],
				url: ''
			}

      dispatch(uploadAdd(newImage, file))
    },
		onRemoveImage: (image: UploadStateImage) => {
      dispatch(uploadRemove(image.image))
		}
  }
}

const UploaderApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderApp
