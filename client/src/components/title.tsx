import * as React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card'

import FlatButton from 'material-ui/FlatButton'

export interface HelloProps {
	compiler: string
	framework: string
}

export class Title extends React.Component<{}, undefined> {
	render() {
		return <h1 className='title'>
				<span className='show'>Show</span> <span className='me'>Me</span>
			</h1>
	}
}
