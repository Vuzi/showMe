import {
	Action,
	login,
} from '../../redux/actions'
import {LoginState, UploadState} from '../../redux/reducers'

import {ConnectCard} from '../connect/connectCard'
import {connect} from 'react-redux'

const mapStateToProps = (state: { upload: UploadState, login: LoginState }) => {
  return {
    login: state.login
	}
}

const mapDispatchToProps = (dispatch: (action: Action<any>) => any) => {
  return {
    onLogin: () => {
			// TODO create user here

      // dispatch(login())
    }
	}
}

const ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectCard)

export default ConnectApp
