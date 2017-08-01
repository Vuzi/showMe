import * as React from 'react'

export interface HelloProps {
	compiler: string
	framework: string
}

export class Title extends React.Component<{}, undefined> {

	render() {
		const titleStyle: React.CSSProperties = {
			fontFamily: 'Amatic SC',
			fontSize: '130px',
			fontWeight: 'normal',
			marginBottom: '10px',
			marginTop: '5px'
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
