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
		return <Paper
				style={this.props.style}
				zDepth={this.state.isHovered ? 1 : this.props.default || 0}
				onMouseOver={() => this.onMouseOver()}
				onMouseOut={() => this.onMouseOut()}
			>
				{this.props.children}
			</Paper>
	}
}
