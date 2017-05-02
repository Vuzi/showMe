import * as pg from 'pg'
import db from './postgre'
import { Category } from '../models/category'
import { Image } from '../models/image'
import { User } from '../models/user'
import { fail } from '../utils/error'
import { URL_ALREADY_EXISTS } from '../utils/errorCode'

export function create(user: User, image: Image): Promise<Image> {

	// TODO handle private pictures ? or shared between users ?
	return db.pool.connect().then((client) => {
		return client.query(`
			SELECT *
			FROM image
			WHERE url = $1
		`, [
			image.url
		]).then((value) => {
			// Already present
			if (value.rowCount > 0)
				return Promise.reject(fail(`Image ${image.title} already exists`, URL_ALREADY_EXISTS))
		}).then(() => {
			return client.query(`
				INSERT INTO image(
					id,
					url,
					title,
					filename,
					description,
					creation,
					modification,
					tags,
					account_id
				) VALUES(
					$1::uuid, $2, $3, $4, $5, $6, $7, $8, $9
				)
			`, [
				image.id,
				image.url,
				image.title,
				image.filename,
				image.description,
				image.creation,
				image.modification,
				image.tags,
				user.id
			])
		}).then(() => {
			client.release()
			return image
		}).catch((e) => {
			client.release()
			return Promise.reject(e instanceof Error ? fail(e) : e)
		})
	})
}

export function get(url: string): Promise<Image> {
	// TODO handle private picture ?
	return db.pool.query(`
		SELECT *
		FROM image
		WHERE url = $1
	`, [
		url
	]).then((res) => res.rows[0])
}

export function setCategory(image: Image, category: Category): Promise<Category> {
	return null // TODO
}

export function update(image: Image): Promise<Image> {
	return null // TODO
}

export function remove(image: Image): Promise<Image> {
	return null // TODO
}

// TODO tester upload d'image
// TODO faire le service d'image (creation + truc)
// TODO faire le controller de gestion de catégories (REST tout ça)
// TODO faire le controller de gestion d'images (REST tout ça)
// ????
// Profit
