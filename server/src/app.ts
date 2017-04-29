import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as lessMiddleware from 'less-middleware'
import * as logger from 'morgan'
import * as path from 'path'
import * as session from 'express-session'

import { RejectionError, reject } from './utils/error'

import categoryEndpoint from './routes/category'
import graphqlEndpoint from './routes/graphql'
import imageEndpoint from './routes/image'
import loginEndpoint from './routes/login'

const app = express()

// uncomment after placing your favicon in /public
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use(session({
	secret: 'thisismylittlesecret!',
	cookie: { maxAge: 60000 },
	rolling: true,
	resave: true,
	saveUninitialized: false
}))

// Use graphql endpoint
// graphqlEndpoint(app)
loginEndpoint(app)
imageEndpoint(app)
categoryEndpoint(app)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(reject(404, 'Not Found'))
});

// Error handlers
// if (app.get('env') === 'development') {
app.use((error: any, req: any, res: any, next: any) => {
	res.status(error.status || 500)
	res.json({
		message: error.error ? error.error.message : error.message,
		error: error.error ? error.error : error,
		detail: error.detail
	})
})
/*} else {
	app.use((error: any, req: any, res: any, next: any) => {
		res.status(error['status'] || 500)
		res.json({
			message: error.message,
			error: {}
		})
	})
}*/

export default app
