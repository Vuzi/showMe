import * as Express from 'express'
import categoryEndpoint from './category'
import imageEndpoint from './image'
import loginEndpoint from './login'

const apiRouter = Express.Router()

apiRouter.use('/user/', loginEndpoint)
apiRouter.use('/image/', imageEndpoint)

export default apiRouter
