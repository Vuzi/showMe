import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import * as React from 'react'

interface Props {
	id: string
}

const BadgeOK = (props: Props) => {

	const iconStyle: React.CSSProperties = {
		float: 'right',
		marginRight: '-30px',
		marginTop: '-85px'
	}

	return <div key={`badge-ko-${props.id}`}>
		<Paper style={iconStyle} zDepth={3} circle={true} >
			<Avatar
				icon={<CheckIcon />}
				color={'white'}
				backgroundColor={'green'}
				size={50}
			/>
		</Paper>
	</div>
}

export default BadgeOK
