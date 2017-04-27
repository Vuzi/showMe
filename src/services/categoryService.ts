import * as pg from 'pg'

import { Category } from '../models/category'
import { User } from '../models/user'
import db from './postgre'

export function create(user: User, category: Category): Promise<Category> {
	return db.pool.connect().then((client) => {
		return client.query(`
			SELECT *
			FROM category
			WHERE name = $1
			AND account_id = $2
		`, [
			category.name,
			user.id
		]).then((value) => {
			// Already present
			if (value.rowCount > 0)
				return Promise.reject(new Error('Category already exists'))
		}).then(() => {
			return client.query(`
				INSERT INTO category(
					id,
					name,
					creation,
					tags,
					account_id
				) VALUES(
					$1::uuid,
					$2,
					$3,
					$4,
					$5
				)
			`, [
				category.id,
				category.name,
				category.creation,
				category.tags,
				user.id
			])
		}).then(() => {
			client.release()
			return category
		}).catch((e) => {
			client.release()
			return Promise.reject(e)
		})
	})

}

export function get(user: User, name: string): Promise<Category> {
	// TODO also fetch with images
	return db.pool.query(
		`SELECT *
		 FROM category
		 WHERE name = $1
		 AND account_id = $2
		`, [
			name,
			user.id
		]
	)
	.then((res) => res.rows[0])
}


export function update(user: User, category: Category): Promise<Category> {
	// TODO
	return null
}

export function remove(user: User, category: Category): Promise<void> {
	// TODO
	return null
}

export function search(user: User, tags: string[]): Promise<Category> {
	// TODO
	return null
}

export function list(user: User): Promise<Category[]> {
	// TODO also fetch with images
	return db.pool.query(
		`SELECT *
		 FROM category
		 WHERE account_id = $1
		`, [
			user.id
		]
	)
	.then((res) => res.rows)
}
