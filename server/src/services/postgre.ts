import * as config from 'config'
import * as pg from 'pg'
import logger from '../utils/logger'

const pool = new pg.Pool(config.get('db.config'))

const initScript = `
	CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;

	-- Accounts table (no password, because we use Google accounts)
	CREATE TABLE IF NOT EXISTS account (
		id          VARCHAR(128) PRIMARY KEY,
		mail        VARCHAR(255) UNIQUE,
		avatar      VARCHAR(512),
		first_name  VARCHAR(64),
		family_name VARCHAR(64)
	);

	-- Category table
	CREATE TABLE IF NOT EXISTS category (
		id          UUID          PRIMARY KEY,
		name        VARCHAR(64)   NOT NULL,
		creation    TIMESTAMP     NOT NULL,
		tags        VARCHAR(32)[] NOT NULL,
		account_id  VARCHAR(128)  REFERENCES account(id)  ON DELETE CASCADE, -- Owner of the category
		UNIQUE (account_id, name)
	);

	-- Image table
	CREATE TABLE IF NOT EXISTS image (
		id           UUID          PRIMARY KEY,
		url          TEXT          NOT NULL UNIQUE,
		title        VARCHAR(64)   NOT NULL, -- TODO add indexe everywhere
		filename     VARCHAR(64)   NOT NULL,
		description  TEXT,
		creation     TIMESTAMP     NOT NULL,
		modification TIMESTAMP     NOT NULL,
		tags         VARCHAR(32)[] NOT NULL,
		account_id   VARCHAR(128)  REFERENCES account(id) ON DELETE CASCADE -- Owner of the image
	);

	-- To-do categories
	CREATE TABLE IF NOT EXISTS image_categories (
		image_id    UUID REFERENCES image(id)    ON DELETE CASCADE,
		category_id UUID REFERENCES category(id) ON DELETE CASCADE
	);
`

// Init the database
pool.connect().then((client) => {
	return client.query(initScript, (err, res) => {
		if(err)
			logger.error('Could no boostrap the database (%s)', err)
		else
			logger.info('Database successfully boostraped')
	})
})

export default {
	pool : pool
}
