import * as config from 'config'
import { Express } from 'express'
import * as fs from 'fs'
import * as GoogleAuth from 'google-auth-library'
import * as mime from 'mime-types'
import * as path from 'path'
import * as sanitizeFilename from 'sanitize-filename'
import * as uuid from 'uuid'
import { Category } from '../models/category'
import { Image } from '../models/image'
import { User } from '../models/user'
import * as CategoryService from '../services/categoryService'
import * as ImageService from '../services/imageService'
import * as UserService from '../services/userService'
import { reject } from '../utils/error'


// Auth middleware
export function needAuth(req: any, res: any, next: any) {
	if (req.session.connected === true)
		next()
	else
		next(reject(403, 'Not connected'))
}

export default function (app: Express): void {

	// Login endpoint
	app.post('/user/login', (req, res, next) => {
		const token = req.body.token;

		if (token) {
			// TODO limit to some users
			UserService.register(token).then((user: User) => {
				if (req.session) {
					req.session.connected = true;
					req.session.user = user;
				}
				res.json(user)
			}).catch((err: any) => {
				next(reject(403, err))
			})
		} else
			next(reject(400, 'No token found'))

	})

	// Logout endpoint
	app.get('/user/logout', needAuth, (req, res, next) => {
		if (req.session) {
			req.session.connected = false;
			req.session.user = undefined;
		}

		res.json({ disconnected: true })
	})

	app.get('/user/me', needAuth, (req, res, next) => {
		// Don't bother looking into the database
		res.json(req.session.user)
	})

	// List all the users
	app.get('/user/list', needAuth, (req, res, next) => {
		UserService.list()
		.then((users: User[]) => {
			res.json(users)
		}).catch((err: any) => {
			next(reject(400, err))
		})
	})
}
