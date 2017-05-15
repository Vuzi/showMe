import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import IconHistory from 'material-ui/svg-icons/action/history'
import IconLock from 'material-ui/svg-icons/action/lock-open'
import IconUpload from 'material-ui/svg-icons/file/file-upload'
import * as React from 'react'
import { PaperHoverable } from './paperHoverable'

export class AppBar extends React.Component<{}, { selectedIndex: number }> {

	constructor(){
		super()
		this.state = {
    	selectedIndex: 0,
		}
	}

  select(index: number) {
		this.setState({selectedIndex: index})
	}

	render() {
    const style: React.CSSProperties = {
      marginBottom: '15px'
    }

		return <PaperHoverable style={style} default={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Upload"
            icon={<IconUpload/>}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Recents"
            icon={<IconHistory/>}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Log out"
            icon={<IconLock/>}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </PaperHoverable>
	}

}
