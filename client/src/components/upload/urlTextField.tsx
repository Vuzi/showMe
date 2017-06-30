import OpenIcon from 'material-ui/svg-icons/action/open-in-new'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import * as CopyToClipboard from 'react-copy-to-clipboard'

export interface Props {
	url: string
}

export class UrlTextField extends React.Component<Props, {}> {

	render() {
		const {url} = this.props

		const style = {
			float: 'right',
			width: 'auto',
			marginTop: '30px',
			cursor: 'pointer'
		}

			return <div key={`url-${url}`}>
				<TextField
					defaultValue={url}
					floatingLabelText='Image URL'
					style={{ width: 'calc(100% - 70px)' }}
				/>
				<div style={style} >
					<OpenIcon fontSize='10' onClick={() => window.open(url, '_blank')} style={{ marginRight: '5px' }} />
					<CopyToClipboard text={url} onCopy={() => console.log('copied')}>
						<CopyIcon fontSize='10' />
					</CopyToClipboard>
				</div>
			</div>
	}

}
