import { connect } from 'react-redux'
import { LoginState, UploadState } from '../../redux/reducers'
import { ConnectCard } from '../connect/connectCard'
import {
	Action,
	login,
} from '../../redux/actions'


const mapStateToProps = (state: { upload: UploadState, login: LoginState }) => {
  return {
    login: state.login
	}
}

const mapDispatchToProps = (dispatch: (action: Action<any>) => any) => {
  return {
    onLogin: (token: string) => {
      dispatch(login(token))
    }
	}
}

const ConnectApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectCard)

export default ConnectApp
