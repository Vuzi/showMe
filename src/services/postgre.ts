import * as config from 'config'
import * as pg from 'pg'

export default {
	pool : new pg.Pool(config.get('db.config'))
}
