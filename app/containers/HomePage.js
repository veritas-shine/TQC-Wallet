// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WalletActions from '../actions/wallet'
import MainView from './MainView'
import ImportView from './ImportView'

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
  props: Props;
  constructor(props, context) {
    super(props, context)
    this.props.getCurrentWallet()
  }
  componentWillMount() {
    console.log(20, this.props)
  }

  render() {
    const { wallet } = this.props
    let content = null
    if (wallet.current.address) {
      content = <MainView />
    } else {
      content = <ImportView />
    }
    return content
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
