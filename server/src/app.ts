import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as Express from 'express'
import * as session from 'express-session'
import * as fs from 'fs'
import * as logger from 'morgan'
import * as path from 'path'
import apiEndpoint from './routes/api/api'
import { reject } from './utils/error'
import { NOT_FOUND, UNKNOWN } from './utils/errorCode'

const app = Express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(Express.static(path.join(__dirname, '../public')))
app.use(session({
	secret: 'thisismylittlesecret!',
	cookie: { maxAge: 6000000 },
	rolling: true,
	resave: true,
	saveUninitialized: false
}))

// Api
app.use('/api/', apiEndpoint)

// Use graphql endpoint
// graphqlEndpoint(app)

// Entrypoint (everything not starting by '/api')
app.get(/^.*$/, (req, res, next) => {
	const index = path.join(__dirname, '../public/index.html')
	fs.stat(index, (err, file) => {

		if (err) // Should not happen
			return next(reject(500, 'Website not available'))

    res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': file.size
    })

		fs.createReadStream(index).pipe(res)
	})
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(reject(404, 'Not Found', NOT_FOUND))
});

// Error handlers
// if (app.get('env') === 'development') {
app.use((error: any, req: any, res: any, next: any) => {
	res.status(error.status || 500)
	res.json({
		message: error.error ? error.error.message : error.message,
		error: error.error ? error.error : error,
		code: error.code || UNKNOWN,
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
