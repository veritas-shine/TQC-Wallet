import React, { PureComponent } from 'react'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from 'grommet/components/List'

import * as transactionActions from '../actions/transaction'
import TransactionItem from '../components/TransactionItem'

type Props = {
  wallet: any,
  server: any,
  transaction: any,
  getTransactionList: () => void,
  searchTransactionByID: ({ id: string }) => void
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    transaction: state.transaction,
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(transactionActions, dispatch)
}

class TransactionView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    this.props.getTransactionList()
  }

  handleChange = event => {
    const { value } = event.target
    this.setState({ search: value })
  }

  handleSearch = event => {
    if (event.keyCode === 13) {
      const { search } = this.state
      this.props.searchTransactionByID({ id: search })
    }
  }

  render() {
    const { transaction: { list }, server, wallet: {current} } = this.props
    const { network: {publicKeyHash} } = server.config
    const myAddress = current.address
    return (<Box style={ { padding: 20 } }>
      <Header>
        <Title>
          Search:
        </Title>
        <Box
          flex
          justify='end'
          direction='row'
          responsive={ false }>
          <Search
            style={ { border: '1px solid #2A2929' } }
            inline
            fill
            size="medium"
            placeHolder="Transaction ID"
            dropAlign={ { right: 'right' } }
            onDOMChange={ this.handleChange }
            onKeyDown={ this.handleSearch }
          />
        </Box>
      </Header>
      <List>
        { list.map((looper, idx) =>
          (<TransactionItem key={ idx } data={ looper } network={ publicKeyHash } myAddress={myAddress} />)) }
      </List>
    </Box>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionView)
