// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import Value from 'grommet/components/Value'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Anchor from 'grommet/components/Anchor'
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
import UnitView from '../components/UnitView'

const kUnitMap = UnitView.UnitMap

type Props = {
  wallet: walletStateType,
  lockWallet: () => void,
  getCurrentWallet: () => void
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
    this.state = {
      showSendView: false,
      unit: 'TQC'
    }
  }

  componentWillMount() {
    console.log(20, this.props)
    this.props.getCurrentWallet()
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
      <Box justify="center" align="center" flex="grow" style={ { height: 'calc(100vh - 300px)' } }>
        <UnlockView />
      </Box>
    )
  }

  changeUnit = (unit) => {
    this.setState({ unit })
  }

  renderWallet = () => {
    const { wallet: { current, locked } } = this.props
    if (locked) {
      return this.renderUnlockView()
    } else {
      const { unit } = this.state
      return (
        <Article>
          <Box colorIndex="grey-4">
            <Anchor
              onClick={ this.lockAccount } style={ { position: 'fixed', right: 44, top: 120 } } primary
              icon={ <LockIcon /> } />
          </Box>
          <Section justify="center" align="center">
            Address: <Label size="small" style={ { marginBottom: 20 } }>{ current.address }</Label>
            <QRCode value={ current.address || '' } />
          </Section>
          <Section>
            <div style={{textAlign: 'center'}}>
              <Value value={ current.balance / kUnitMap[unit] } />
              <UnitView didUnitChanged={ this.changeUnit } />
            </div>
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
