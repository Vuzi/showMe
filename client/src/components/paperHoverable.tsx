import Paper from 'material-ui/Paper'
import * as React from 'react'

export interface State {
	isHovered: boolean
}

export interface Props {
	style?: React.CSSProperties,
	default?: number
}

export class PaperHoverable extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      isHovered: false
    }
  }

	onMouseOver() {
		this.setState({
			isHovered : true
		})
	}

	onMouseOut() {
		this.setState({
			isHovered : false
		})
	}

	render() {
		const defaultValue = this.props.default || 0

		return <Paper
				style={this.props.style}
				zDepth={this.state.isHovered ? defaultValue + 1 : defaultValue}
				onMouseOver={() => this.onMouseOver()}
				onMouseOut={() => this.onMouseOut()}
			>
				{this.props.children}
			</Paper>
	}
}
