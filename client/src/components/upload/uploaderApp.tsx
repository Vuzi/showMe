import * as uuid from 'uuid'

import {
	Action,
	uploadAdd,
} from '../../redux/actions'
import {LoginState, UploadState} from '../../redux/reducers'

import {Image} from '../../models/image'
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
				filename: '',
				title: file.name,
				tags: [],
				url: file.name
			}

      dispatch(uploadAdd(newImage, file))
    }
  }
}

const UploaderApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)

export default UploaderApp
