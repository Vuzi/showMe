import { connect } from 'react-redux'
import * as uuid from 'uuid'
import { Uploader } from './uploader'
import { Image } from '../../models/image'
import {
	Action,
	uploadAdd,
	uploadEdit,
	uploadRemove,
	uploadStart
	} from '../../redux/actions'
import { LoginState, UploadState } from '../../redux/reducers'
import { UploadStateImage } from '../../redux/reducers'

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
		onRemoveImage: (image: Image) => {
      dispatch(uploadRemove(image))
		},
		onUploadImage: (image: Image, file: File) => {
      dispatch(uploadStart(image, file))
		},
		onEditImage: (image: Image) => {
      dispatch(uploadEdit(image))
		},
  }
}

const UploaderApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderApp
