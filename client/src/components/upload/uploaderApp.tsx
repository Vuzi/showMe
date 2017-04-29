import * as uuid from 'uuid'

import {
	Action,
	uploadAdd,
	uploadRemove,
	uploadStart,
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
				filename: '', // Create by the server
				title: file.name,
				tags: [],
				url: file.name
			}

      dispatch(uploadAdd(newImage, file))
    },
		onRemoveImage: (image: UploadStateImage) => {
      dispatch(uploadRemove(image.image))
		},
		onUploadImage: (image: UploadStateImage) => {
      dispatch(uploadStart(image.image, image.file))
		},
  }
}

const UploaderApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderApp
