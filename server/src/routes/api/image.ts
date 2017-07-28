import * as Express from 'express'
import * as fs from 'fs'
import * as mime from 'mime-types'
import * as path from 'path'
import * as sharp from 'sharp'
import * as uuid from 'uuid'
import { needAuth } from './login'
import { Image } from '../../models/image'
import * as ImageService from '../../services/imageService'
import { Exception, reject } from '../../utils/error'
import { FILENAME_INVALID, IMAGE_NOT_FOUND } from '../../utils/errorCode'

const router = Express.Router()

// TODO externalise
const storagePath = __dirname + '/../../../images/'
const storagePathThumbnail = storagePath + 'thumbnails/'

// Download an image
router.get('/raw/:filename(*)', (req, res, next) => {
	ImageService.get(req.params.filename)
	.then((image) => {
		const filePath = storagePath + image.filename

		fs.exists(filePath, (exist) => {
			if(!exist)
				return next(reject(404, 'Image not found', IMAGE_NOT_FOUND))
			 
			res.contentType(mime.lookup(image.filename) || 'application/octet-stream')
			fs.createReadStream(filePath).pipe(res)
		})
	})
	.catch((err) => {
		next(reject(400, err))
	})
})

// Download a thumbnail
router.get('/preview/:filename(*)', (req, res, next) => {
	ImageService.get(req.params.filename)
	.then((image) => {
		const filePath = storagePathThumbnail + image.filename

		fs.exists(filePath, (exist) => {
			if(!exist)
				return next(reject(404, 'Thumbnail image not found', IMAGE_NOT_FOUND))
			 
			res.contentType(mime.lookup(image.filename) || 'application/octet-stream')
			fs.createReadStream(filePath).pipe(res)
		})
	})
	.catch((err) => {
		next(reject(400, err))
	})
})

// Get all the images
router.get('/list', needAuth, (req, res, next) => {
	const filter: string[] = req.query.filter ? (req.query.filter + '').split(',').map(s => s.trim()).filter(s => s.length > 0) : []

	ImageService.list(req.session.user, filter)
	.then((images) => {
		res.json(images)
	})
	.catch((err) => {
		next(reject(400, err))
	})
})

// Download an image's metadata
router.get('/:filename(*)', (req, res, next) => {
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
	const url = req.params.url
	const title = req.query.title
	const description = req.query.description
	const tags = req.query.tags.split(';').map((t) => t.trim()).filter((t) => t.length > 0)

	// Check provided names
	if (url.length <= 0)
		return next(reject(400, 'Invalid filename', FILENAME_INVALID))

	const internalFileName = uuid() + path.extname(url)
	const filePath = storagePath + internalFileName
	const fileThumbnailPath = storagePathThumbnail + internalFileName

	const onEnd = () => {
		const newImage: Image = {
			id: uuid(),
			url,
			title: title || url,
			filename: internalFileName,
			description: description || '',
			creation: new Date(),
			modification: new Date(),
			tags: tags || []
		}

		ImageService.create(req.session.user, newImage)
		.then((image) => {
			res.json(image)
		})
		.catch((err: Exception) => {
			fs.unlink(filePath, () => {
				next(reject(405, err.error, err.code, newImage))
			})
		})
	}

	req.pipe(fs.createWriteStream(filePath))
	.on('finish', () => {
		fs.createReadStream(filePath)
		.pipe(sharp().resize(400))
		.pipe(fs.createWriteStream(fileThumbnailPath))
		.on('finish', onEnd)
		.on('error', (err) => {
			fs.unlink(filePath, () => {
				next(reject(500, err))
			})
		})
	})
	.on('error', (err) => {
		next(reject(500, err))
	})
})

export default router
