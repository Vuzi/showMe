import { History } from 'history'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import IconHistory from 'material-ui/svg-icons/action/history'
import IconLock from 'material-ui/svg-icons/action/lock-open'
import IconUpload from 'material-ui/svg-icons/file/file-upload'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
  } from 'react-router-dom'
import { PaperHoverable } from './paperHoverable'

interface AppTab {
  route: string
  label: string
  icon: JSX.Element
}

interface Props {
  history: History
  tabs: AppTab[]
  current: string
}

export class AppBar extends React.Component<Props, { selectedIndex: number }> {

	constructor(){
		super()
		this.state = {
    	selectedIndex: 0,
		}
  }

  componentWillReceiveProps(newProps: Props) {
    // Select the tab according to the current path
    const selected = newProps.tabs.map((tab, i) => ({ tab, i })).filter((tab) => {
      return newProps.current.indexOf(tab.tab.route) === 0
    })[0]

    if(selected)
      this.setState({selectedIndex: selected.i})
    else
      this.setState({selectedIndex: 0})
  }

  select(index: number) {
    this.props.history.push(this.props.tabs[index].route)
		this.setState({selectedIndex: index})
	}

	render() {
    const style: React.CSSProperties = {
      marginBottom: '15px'
    }

		return <div>
      <PaperHoverable style={style} default={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          {
            this.props.tabs.map((tab, i) => {
              return <BottomNavigationItem
                  key={`tab-${i}`}
                  label={tab.label}
                  icon={tab.icon}
                  onTouchTap={() => this.select(i)}
                />
            })
          }
        </BottomNavigation>
      </PaperHoverable>
    </div>
	}

}
