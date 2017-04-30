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
export const LOGIN_SUCCESS: EventType = 'LOGIN_SUCCESS'
export const LOGIN_FAILED: EventType = 'LOGIN_FAILED'
export const LOGOUT: EventType = 'LOGOUT'

export const UPLOAD_ADD: EventType = 'UPLOAD_ADD'
export const UPLOAD_EDIT: EventType = 'UPLOAD_EDIT'
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

export function login(token: string): any {
  return (dispatch: any) => {
		// Login stated
    dispatch({
			type: LOGIN
		})

		fetch('/api/user/login', {
			method: 'POST',
  		credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		})
		.then((res) => {
			return res.json().then((json) => {
				return { json, res }
			})
		})
		.then((req) => {
			if (req.res.status === 200)
				dispatch(loginSuccess(req.json as User)) // TODO fix ts
			else
				dispatch(loginFailed(req.json))
		})
		.catch((err) => {
			dispatch(loginFailed(err))
		})
	}
}

export function loginSuccess(user: User): Action<User> {
	return {
		type: LOGIN_SUCCESS,
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
export function uploadEdit(image: Image): Action<Image> {
	return {
		type: UPLOAD_EDIT,
		value: image
	}
}

export function uploadStart(image: Image, file: File): any {
  return (dispatch: any) => {
		// Upload stated
    dispatch({
			type: UPLOAD_START,
			value: image
		})

		// Use XMLHttpRequest because fetch don't handle progress yet
		const xhr = new XMLHttpRequest()
		xhr.withCredentials = true

		xhr.upload.addEventListener('progress', (event) => {
			const progress = event.loaded / event.total * 100;
			dispatch(uploadUpdate(image, progress))
		}, false);

		xhr.onreadystatechange = (event) => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200)
					dispatch(uploadSuccess(image))
				else
					dispatch(uploadFailed(image, JSON.parse(xhr.responseText))) // TODO get error ? test
			}
		}

		xhr.open('POST', `/api/image/${image.url}`, true); // TODO URL encode
		xhr.send(file);
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
