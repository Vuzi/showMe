import * as Express from 'express'
import * as uuid from 'uuid'
import { needAuth } from './login'
import { Category } from '../models/category'
import { Image } from '../models/image'
import * as CategoryService from '../services/categoryService'
import { reject } from '../utils/error'

const router = Express.Router()

// Test
router.get('/test', needAuth, (req, res, next) => {
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
		next(reject(400, err, undefined, newCategory)) // TODO handle errors in service
	})
})

export default router
