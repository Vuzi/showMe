import * as config from 'config'
import * as GoogleAuth from 'google-auth-library'
import * as pg from 'pg'
import db from './postgre'
import { User } from '../models/user'
import logger from '../utils/logger'

const clientId = config.get('google.clientId')

logger.info("Using %s as the google API key", clientId)

/**
 * List all the users in the database
 */
export function list(): Promise<User[]> {
	// Only used for debug reasons
	return db.pool.query(
		`SELECT *
	 	 FROM account`
	)
	.then((res: pg.QueryResult) => res.rows)
}

/**
 * Register the provided Google user, using the provided token.
 *
 * @param token The Google token to use
 */
export function register(token: string): Promise<User> {
	return new Promise<User>((resolve, reject) => {

		const auth = new GoogleAuth()
		const client = new auth.OAuth2('CLIENT_ID', '', '')

		client.verifyIdToken(
			token,
			clientId,
			(e: any, res: any) => {

				if (res) {
					const payload = res.getPayload()
					const user: User = {
						id : payload.sub,
						firstName : payload.given_name,
						familyName : payload.family_name,
						avatar : payload.picture,
						email : payload.email
					}

					// Filter the user's email
					const auth = config.get<string>('auth')
					if(auth !== '*' && auth.split(';').filter(a => a === user.email).length === 0) {
						reject('User not authorized')
						return
					}

					db.pool.query(
						`INSERT INTO account(
							id,
							mail,
							avatar,
							first_name,
							family_name
						) VALUES(
							$1,
							$2,
							$3,
							$4,
							$5
						) ON CONFLICT (mail) DO UPDATE SET
							id = $1,
							mail = $2,
							avatar = $3,
							first_name = $4,
							family_name = $5`,
						[
							user.id,
							user.email,
							user.avatar,
							user.firstName,
							user.familyName
						]
					)
					.then(() => resolve(user))
					.catch((err) => reject(err))
				} else
					reject(e)
			})
	})
}
