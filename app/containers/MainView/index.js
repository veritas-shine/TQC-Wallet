import React, { PureComponent } from 'react'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Footer from 'grommet/components/Footer'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'

import WalletView from '../WalletView'
import BlockView from '../BlockView'
import TransactionView from '../TransactionView'

export default class MainView extends PureComponent {
  render() {
    return (<Article full="vertical" colorIndex="grey-4">
      <Section style={{height: 'calc(100vh - 200px)'}}>
        <Tabs colorIndex="grey-4">
          <Tab title='Wallet'>
            <WalletView />
          </Tab>
          <Tab title='Block'>
            <BlockView />
          </Tab>
          <Tab title='Transaction'>
            <TransactionView />
          </Tab>
          <Tab title='Setting'>
            <div />
          </Tab>
        </Tabs>
      </Section>
      <Box justify="end" align="stretch" flex="grow">
        <Footer justify='between' pad="small" style={ { padding: '10px 40px 24px' } }>
          <Label>
            TQC Wallet
          </Label>
          <Box direction='row'
               align='center'
               pad={ { "between": "medium" } }>
            <Paragraph margin='none'>
              © 2018 TQC Wallet
            </Paragraph>
          </Box>
        </Footer>
      </Box>
    </Article>)
  }
}
