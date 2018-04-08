import React, { PureComponent } from 'react'
import Sidebar from 'grommet/components/Sidebar'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Split from 'grommet/components/Split'
import DebugView from './DebugView'

export default class SettingView extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {menu: 0}
  }
  handleMenuClick = (idx) => {
    this.setState({menu: idx})
  }
  render() {
    const {menu} = this.state
    const getClassName = (idx) => (idx === menu ? 'active' : '')
    return (
      <Split separator flex="right" style={{height: 'calc(100vh - 200px)', overflow: 'hidden', borderBottom: '1px solid #2A2929'}}>
        <Sidebar>
          <Box flex='grow'
               justify='start'>
            <Menu primary>
              <Anchor href='#' className={getClassName(0)} onClick={() => this.handleMenuClick(0)}>
                Debug
              </Anchor>
              <Anchor href='#' className={getClassName(1)} onClick={() => this.handleMenuClick(1)}>
                Second
              </Anchor>
              <Anchor href='#' className={getClassName(2)} onClick={() => this.handleMenuClick(2)}>
                Third
              </Anchor>
            </Menu>
          </Box>
        </Sidebar>
        {0 === menu && <DebugView />}
        {1 === menu && <Box />}
        {2 === menu && <Box />}
      </Split>)
  }
}
