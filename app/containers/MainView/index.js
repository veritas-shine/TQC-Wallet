import React, { PureComponent } from 'react'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'

import Footer from '../../components/Footer'
import WalletView from '../WalletView'
import BlockView from '../BlockView'
import TransactionView from '../TransactionView'
import SettingView from '../SettingView'

export default class MainView extends PureComponent {
  render() {
    return (<Article full="vertical" colorIndex="grey-4">
      <Section style={{height: 'calc(100vh - 200px)'}}>
        <Tabs colorIndex="grey-4">
          <Tab title="Wallet">
            <WalletView />
          </Tab>
          <Tab title="Block">
            <BlockView />
          </Tab>
          <Tab title="Transaction">
            <TransactionView />
          </Tab>
          <Tab title="Setting">
            <SettingView />
          </Tab>
        </Tabs>
      </Section>
      <Box justify="end" align="stretch" flex="grow">
        <Footer />
      </Box>
    </Article>)
  }
}
