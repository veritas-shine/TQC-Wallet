// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import Value from 'grommet/components/Value'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Label from 'grommet/components/Label'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Columns from 'grommet/components/Columns'
import LockIcon from 'grommet/components/icons/base/Lock'
import QRCode from 'qrcode.react'

import SendView from './SendView'
import UnlockView from './UnLockView'
import type { walletStateType } from '../reducers/wallet'
import * as WalletActions from '../actions/wallet'

type Props = {
  wallet: walletStateType,
  lockWallet: () => void
};


function mapStateToProps(state) {
  return {
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WalletActions, dispatch)
}

class WalletView extends Component<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = { showSendView: false }
  }

  showSendModal = () => {
    this.setState({ showSendView: true })
  }

  hideSendView = () => {
    this.setState({ showSendView: false })
  }

  lockAccount = (event) => {
    console.log(54, event)
    this.props.lockWallet()
  }

  renderUnlockView = () => {
    return (
      <Box justify="center" align="center" flex="grow" style={{height: 'calc(100vh - 300px)'}}>
        <UnlockView />
      </Box>
    )
  }

  renderWallet = () => {
    const { wallet: { current, locked } } = this.props
    if (locked) {
      return this.renderUnlockView()
    } else {
      return (
        <Article>
          <div>
            <Button
              onClick={ this.lockAccount } style={ { position: 'fixed', right: 44, top: 120 } } accent
              icon={ <LockIcon colorIndex="plain" /> } />
          </div>
          <Section justify="center" align="center">
            Address: <Label size="small" style={ { marginBottom: 20 } }>{ current.address }</Label>
            <QRCode value={ current.address || '' } />
          </Section>
          <Section>
            <Value value={ current.balance / 1e8 } label="TQC" />
          </Section>
          <Section justify="center" align="center">
            <Columns justify="center">
              <Box align="center" pad="small" margin="small">
                <Button label="Send" onClick={ this.showSendModal } primary />
              </Box>
            </Columns>
          </Section>
        </Article>
      );
    }
  }

  render() {
    const { showSendView } = this.state
    if (showSendView) {
      return <SendView hideSendView={ this.hideSendView } />
    } else {
      return this.renderWallet()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletView)
