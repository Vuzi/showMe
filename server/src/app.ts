import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as Express from 'express'
import * as session from 'express-session'
import * as fs from 'fs'
import * as morgan from 'morgan'
import logger from './utils/logger'
import * as path from 'path'
import apiEndpoint from './routes/api/api'
import { reject } from './utils/error'
import { NOT_FOUND, UNKNOWN } from './utils/errorCode'

logger.info('Show me app started')

const app = Express()

app.use(morgan(app.get('env'), { stream: {
    write: (message: string) => {
      logger.info(message.trim());
    }
	}
}))
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

// Entrypoint
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
})

// Error handler
app.use((error: any, req: any, res: any, next: any) => {
	const status = error.status || 500
	const code = error.code || UNKNOWN
	const message = error.error ? error.error.message : error.message
	const detail = error.detail
	
	logger.warn('Some error occured %s (%s)', code, message, error)

	res.status(status)
	res.json({
		message: message,
		error: error.error ? error.error : error,
		code: code,
		detail: detail
	})
})

export default app
