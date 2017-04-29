import { Image } from '../models/image'
import { User } from '../models/user'

export type EventType = string

export interface Action<T> {
	type: EventType
	value: T
}

/**
 * Actions types
 */
export const LOGIN: EventType = 'LOGIN'
export const LOGIN_FAILED: EventType = 'LOGIN_FAILED'
export const LOGOUT: EventType = 'LOGOUT'

export const UPLOAD_ADD: EventType = 'UPLOAD_ADD'
export const UPLOAD_REMOVE: EventType = 'UPLOAD_REMOVE'
export const UPLOAD_START: EventType = 'UPLOAD_START'
export const UPLOAD_UPDATE: EventType = 'UPLOAD_UPDATE'
export const UPLOAD_SUCCESS: EventType = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILED: EventType = 'UPLOAD_FAILED'

// TODO events for category management
// TODO events for image management
// TODO events for etc...

/**
 * Actions creator
 */

export function login(user: User): Action<User> {
	return {
		type: LOGIN,
		value: user
	}
}

export function loginFailed(error: any): Action<any> {
	return {
		type: LOGIN_FAILED,
		value: error // TODO error typing
	}
}

export function logout(): Action<void> {
	return {
		type: LOGOUT,
		value: null
	}
}

export function uploadAdd(image: Image, file: File): Action<{image: Image, file: File}> {
	return {
		type: UPLOAD_ADD,
		value: {
			image,
			file
		}
	}
}

export function uploadRemove(image: Image): Action<Image> {
	return {
		type: UPLOAD_REMOVE,
		value: image
	}
}

export function uploadStart(image: Image, file: File): any {
	console.log('uploadStart called')

  return (dispatch: any) => {
		console.log('uploadStart internal called')
		// Upload stated
    dispatch({
			type: UPLOAD_START,
			value: image
		})

		// Use XMLHttpRequest because fetch don't handle progress yet
		const xhr = new XMLHttpRequest()

		xhr.upload.addEventListener('progress', (event) => {
			const progress = 100 - (event.loaded / event.total * 100);
			dispatch(uploadUpdate(image, progress))
		}, false);

		xhr.onreadystatechange = (event) => {
			if (xhr.readyState === 4) {
			console.log('uploadStart done')
				if (xhr.status === 200)
					dispatch(uploadSuccess(image))
				else
					dispatch(uploadFailed(image, { message : 'TODO' })) // TODO get error
			}
		}

		xhr.open('POST', `/image/${image.url}`, true);
		xhr.send(file);

		/*
		return fetch(`/image/${image.url}`, {
			method: 'POST',
			headers: {
				"Content-Type": file.type
			},
			body: file
		})
		.then((response) => response.json())
		.then((json) => {
			// Upload done
			console.log(json)
			dispatch(uploadSuccess(image))
		})
		.catch((err) => {
			// Upload failed
			console.log(err)
			dispatch(uploadFailed(image, err))
		})*/
  }
}

export function uploadUpdate(image: Image, percent: number): Action<{percent: number, image: Image}> {
	return {
		type: UPLOAD_UPDATE,
		value: {
			percent,
			image
		}
	}
}

export function uploadSuccess(image: Image): Action<Image> {
	return {
		type: UPLOAD_SUCCESS,
		value: image
	}
}

export function uploadFailed(image: Image, error: any): Action<{error: any, image: Image}> {
	return {
		type: UPLOAD_FAILED,
		value: {
			error, // TODO error typing
			image
		}
	}
}
