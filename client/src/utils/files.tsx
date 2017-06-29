import { Image } from '../models/image'

export function filenameTrim(filename: string): string {
	return filename.substr(0, filename.lastIndexOf('.')) || filename
}

export function imageUrl(image: Image) {
	const location = window.location
	const port = location.port === '80' ? '' : `:${location.port}`
	return `${location.protocol}//${location.hostname}${port}/api/image/raw/${image.url}`
}
