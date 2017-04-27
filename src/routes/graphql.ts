import * as UserService from '../services/userService'
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql'
import * as uuid from 'uuid'

import { buildSchema, graphql } from 'graphql'

import { Express } from 'express'
import { User } from '../models/user'
import schema from '../graphs/schema'

export default function (app: Express): void {

	app.use(bodyParser.text({ type: 'application/graphql' }));

	// Interactive GraphQL
	app.use('/graphql/interactive', graphqlHTTP({
		schema,
		graphiql: true,
	}));

	app.post('/graphql', (req, res) => {
		graphql(schema, req.body).then((result) => {
			res.send(JSON.stringify(result, null, 2))
		})
	});
}
