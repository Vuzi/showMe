import * as accepts from 'attr-accept'
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
	} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Dropzone from 'react-dropzone'
import GoogleLogin from 'react-google-login'

export interface Props {
	onPastedFiles: (acceptedFiles: File[], rejectedFiles: File[]) => void
	accept: string
}

export default class Paster extends React.Component<Props, {}> {
	private eventHandler: any

	componentDidMount() {
		// Bind to the element
		this.eventHandler = this.onPaste.bind(this)
		window.addEventListener("paste", this.eventHandler)
	}

	componentWillUnmount() {
		// Remove the binding
		window.removeEventListener("paste", this.eventHandler)
	}

	onPaste(e: any) {
		if (!e.clipboardData || !e.clipboardData.items)
			return false

		const items = e.clipboardData.items
		const acceptedFiles: File[] = []
		const rejectedFiles: File[] = []

		for (const item of items) {
			let file = item.getAsFile()
			// TODO also handle URLs ..?

			if(!!file) {
				if (accepts(file, this.props.accept))
					acceptedFiles.push(file)
				else
					rejectedFiles.push(file)
			}
		}

		this.props.onPastedFiles(acceptedFiles, rejectedFiles)
	}

	render() {
		return <div style={{ display: 'none'}} />
	}

}
