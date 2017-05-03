import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import ErrorIcon from 'material-ui/svg-icons/content/clear'
import * as React from 'react'

interface Props {
	id: string
}

const BadgeKO = (props: Props) => {

	const iconStyle: React.CSSProperties = {
		float: 'right',
		marginRight: '-30px',
		marginTop: '-85px'
	}

	return <div key={`badge-ko-${props.id}`}>
		<Paper style={iconStyle} zDepth={3} circle={true} >
			<Avatar
				icon={<ErrorIcon />}
				color={'white'}
				backgroundColor={'#BC0000'}
				size={50}
			/>
		</Paper>
	</div>
}

export default BadgeKO
