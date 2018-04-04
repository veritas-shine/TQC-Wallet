import React, { PureComponent } from 'react'
import Sidebar from 'grommet/components/Sidebar'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Split from 'grommet/components/Split'

export default class SettingView extends PureComponent {
  render() {
    return (
      <Split separator flex="right">
        <Sidebar>
          <Box flex='grow'
               justify='start'>
            <Menu primary={ true }>
              <Anchor href='#' className='active'>
                First
              </Anchor>
              <Anchor href='#'>
                Second
              </Anchor>
              <Anchor href='#'>
                Third
              </Anchor>
            </Menu>
          </Box>
        </Sidebar>
        <Box></Box>
      </Split>)
  }
}
