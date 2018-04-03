import React, { PureComponent } from 'react'
import Tabs from 'grommet/components/Tabs'
import Tab from 'grommet/components/Tab'
import Footer from 'grommet/components/Footer'
import Title from 'grommet/components/Title'
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
      <Section>
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
      <Footer justify='between'>
        <Title>
          TQC Wallet
        </Title>
        <Box direction='row'
             align='center'
             pad={ { "between": "medium" } }>
          <Paragraph margin='none'>
            © 2018 TQC Wallet
          </Paragraph>
        </Box>
      </Footer>
    </Article>)
  }
}
