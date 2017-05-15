import * as React from 'react'

export interface HelloProps {
	compiler: string
	framework: string
}

export class Title extends React.Component<{}, undefined> {

	render() {
		const titleStyle: React.CSSProperties = {
			fontFamily: 'Amatic SC',
			fontSize: '160px',
			fontWeight: 'normal',
			marginBottom: '21px',
			marginTop: '10px'
		}

		const titleDetailStyle: React.CSSProperties = {
			fontWeight: 'bold',
			color: '#002e7a'
		}

		return <h1 style={titleStyle}>
				<span>Show </span>
				<span style={titleDetailStyle}>Me</span>
			</h1>
	}

}
