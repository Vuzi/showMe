import * as CategoryService from '../services/categoryService'
import * as uuid from 'uuid'

import { Category } from '../models/category'
import { Express } from 'express'
import { Image } from '../models/image'
import { User } from '../models/user'
import { needAuth } from './login'
import { reject } from '../utils/error'

export default function(app: Express): void {

	app.get('/test', needAuth, (req, res, next) => {
		const newCategory: Category = {
			id: uuid(),
			name: "SecondCategory",
			creation: new Date(),
			tags: ['first', 'category'],
			images: []
		}

		CategoryService.create(req.session.user, newCategory)
		.then((category) => {
			return CategoryService.get(req.session.user, category.name)
		})
		.then((category) => {
			res.json(category)
		})
		.catch((err) => {
			next(reject(400, err, newCategory))
		})
	})

}
