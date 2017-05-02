import * as Express from 'express'
import * as fs from 'fs'
import * as mime from 'mime-types'
import * as path from 'path'
import * as sanitizeFilename from 'sanitize-filename'
import * as uuid from 'uuid'
import { needAuth } from './login'
import { Image } from '../models/image'
import * as ImageService from '../services/imageService'
import { FailureError, reject } from '../utils/error'
import { FILENAME_INVALID } from '../utils/errorCode'

const router = Express.Router()

// TODO externalise
const storagePath = __dirname + '/../../images/'

// Download an image
router.get('/raw/:filename', (req, res, next) => {
	ImageService.get(req.params.filename)
	.then((image) => {
		// Make static ?
		res.contentType(mime.lookup(image.filename) || 'application/octet-stream')
		fs.createReadStream(storagePath + image.filename).pipe(res)
	})
	.catch((err) => {
		next(reject(400, err))
	})
})

// Download an image's metadata
router.get('/:filename', (req, res, next) => {
	ImageService.get(req.params.filename)
	.then((image) => {
		res.json(image)
	})
	.catch((err) => {
		next(reject(400, err))
	})
})

// Upload an image
router.post('/:url', needAuth, (req, res, next) => {
	const url = sanitizeFilename(req.params.url)
	const title = req.query.title
	const description = req.query.description

	// Check provided names
	if (url.length <= 0)
		return next(reject(400, 'Invalid filename', FILENAME_INVALID))

	const internalFileName = uuid() + path.extname(url)
	const filePath = storagePath + internalFileName

	const onEnd = () => {
		const newImage: Image = {
			id: uuid(),
			url,
			title: url,
			filename: internalFileName,
			description: '',
			creation: new Date(),
			modification: new Date(),
			tags: []
		}

		ImageService.create(req.session.user, newImage)
		.then((image) => {
			res.json(image)
		})
		.catch((err: FailureError) => {
			fs.unlink(filePath, () => {
				next(reject(405, err.error, err.code, newImage))
			})
		})
	}

	req.pipe(fs.createWriteStream(filePath))
	.on('end', onEnd)
	.on('close', onEnd)
	.on('error', (err) => {
		next(reject(500, err))
	})
})

export default router
