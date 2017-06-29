import { combineReducers } from 'redux'
import { Image } from '../models/image'
import { User } from '../models/user'
import {
	Action,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	GALLERY_LOAD,
	GALLERY_LOAD_SUCCESS,
	GALLERY_LOAD_FAILED,
	UPLOAD_ADD,
	UPLOAD_EDIT,
	UPLOAD_FAILED,
	UPLOAD_REMOVE,
	UPLOAD_START,
	UPLOAD_SUCCESS,
	UPLOAD_UPDATE,
} from './actions'

export interface LoginState {
	connected: boolean
	connecting: boolean
	user?: User
	error?: any // TODO better type
}

export function login(state: LoginState = {connected: false, connecting : false}, action: Action<any>): LoginState {
  switch (action.type) {
		case LOGIN:
			return {
				connected : false,
				connecting : true,
				user: undefined,
				error: undefined as any
			}

		case LOGIN_SUCCESS:
			return {
				connected : true,
				connecting : false,
				user: action.value,
				error: undefined as any
			}

		case LOGIN_FAILED:
			return {
				connected : false,
				connecting : false,
				user: undefined,
				error: action.value
			}

		case LOGOUT:
			return {
				connected : false,
				connecting : false,
				user: undefined,
				error: undefined as any
			}

		default:
			return state
	}
}

export interface GalleryState {
	images: Image[] // All the images in the gallery
	loading: boolean // If the gallery is loading
	error?: any // TODO better type
}

export function gallery(state: GalleryState = {images: [], loading : false}, action: Action<any>): GalleryState {
  switch (action.type) {
		case GALLERY_LOAD:
			return {
				...state,
				loading: true
			}

		case GALLERY_LOAD_SUCCESS:
			return {
				images: action.value as Image[],
				loading: false,
				error: undefined
			}

		case GALLERY_LOAD_FAILED:
			return {
				...state,
				loading: false,
				error: action.value
			}

		default:
			return state
	}
}

export interface UploadStateImage {
	image: Image          // The image itself
	file: File            // File to upload
	percentUpload: number // Upload progression
	uploaded: boolean     // If the image has been uploaded
	uploading: boolean    // If the image is being uploaded
	error?: any           // Upload error
}

export interface UploadState {
	images: UploadStateImage[] // All the images to upload
}

export function upload(state: UploadState = { images: [] }, action: Action<any>): UploadState {
  switch (action.type) {
		case UPLOAD_ADD:
			return {
				images: [{
					image: action.value.image,
					file: action.value.file,
					percentUpload: 0,
					uploaded: false,
					uploading: false
				}].concat(state.images)
			}

		case UPLOAD_REMOVE:
			return {
				images: state.images.filter((s) => {
					// Ignore images being uploaded
					return !(s.image.id === action.value.id && !s.uploading)
				})
			}

		case UPLOAD_EDIT:
			return {
				images: state.images.map((s) => {
					if (s.image.id === action.value.id && !s.uploading && !s.uploaded)
						return {
							...s,
							image: action.value // Update the image
						}
					else
						return s
				})
			}

		case UPLOAD_START:
			return {
				images: state.images.map((s) => {
					// Ignore images being uploaded or already uploaded
					if (s.image.id === action.value.id && !s.uploading && !s.uploaded)
						return {
							...s,
							percentUpload: 0,
							uploading: true,
							error: undefined
						}
					else
						return s
				})
			}

		case UPLOAD_UPDATE:
			return {
				images: state.images.map((s) => {
					if (s.image.id === action.value.image.id && s.uploading)
						return {
							...s,
							percentUpload: action.value.percent
						}
					else
						return s
				})
			}

		case UPLOAD_SUCCESS:
			return {
				images: state.images.map((s) => {
					if (s.image.id === action.value.id && s.uploading)
						return {
							...s,
							uploading: false,
							uploaded: true
						}
					else
						return s
				})
			}

		case UPLOAD_FAILED:
			return {
				images: state.images.map((s) => {
					if (s.image.id === action.value.image.id && s.uploading)
						return {
							...s,
							uploading: false,
							uploaded: false,
							error: action.value.error
						}
					else
						return s
				})
			}

		default:
			return state
	}
}

const app = combineReducers({
	login,
	gallery,
	upload
})

export default app
