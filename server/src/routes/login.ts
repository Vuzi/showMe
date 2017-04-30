import * as Express from 'express'
import { User } from '../models/user'
import * as UserService from '../services/userService'
import { reject } from '../utils/error'

// Auth middleware
export function needAuth(req: any, res: any, next: any) {
	if (req.session.connected === true)
		next()
	else
		next(reject(403, 'Not connected'))
}

const router = Express.Router()

// Login endpoint
router.post('/login', (req, res, next) => {
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
router.get('/logout', needAuth, (req, res, next) => {
	if (req.session) {
		req.session.connected = false;
		req.session.user = undefined;
	}

	res.json({ disconnected: true })
})

// Personal endpoint
router.get('/me', needAuth, (req, res, next) => {
	// Don't bother looking into the database
	res.json(req.session.user)
})

// List all the users
router.get('/list', needAuth, (req, res, next) => {
	UserService.list()
	.then((users: User[]) => {
		res.json(users)
	}).catch((err: any) => {
		next(reject(400, err))
	})
})

export default router
