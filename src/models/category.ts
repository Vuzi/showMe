import { Image } from './image'

export interface Category {
	id: string
	name: string
	creation: Date
	images: Image[]
	tags: string[]
}
