// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Section from 'grommet/components/Section'
import * as WalletActions from '../actions/wallet'
import MainView from './MainView'
import ImportView from './ImportView'
import UnLockView from './UnLockView'

type Props = {
  wallet: any,
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

class HomePage extends Component<Props> {
  props: Props

  componentWillMount() {
    console.log(20, this.props)
    this.props.getCurrentWallet()
  }

  needReloadView = () => {
    this.props.getCurrentWallet()
  }

  render() {
    const { wallet: {current} } = this.props
    const {address, encrypted} = current
    let content = null
    if (address) {
      content = <MainView />
    } else if (encrypted) {
      content = (<Section style={{height: '100%'}} colorIndex="grey-4">
        <UnLockView />
      </Section>)
    } else {
      content = <ImportView needReloadView={this.needReloadView} />
    }
    return content
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
