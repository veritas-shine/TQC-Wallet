import React, { PureComponent } from 'react'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'grommet/components/Table'

import * as transactionActions from '../actions/transaction'
import TransactionItem from '../components/TransactionItem'

type Props = {
  transaction: any,
  getTransactionList: () => void,
  searchTransactionByID: ({ id: string }) => void
}

function mapStateToProps(state) {
  return {
    transaction: state.transaction
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
    const { transaction: { list } } = this.props
    return (<Box style={{padding: 20}}>
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
            style={{border: '1px solid #999'}}
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
      <Table>
        {TransactionItem.Column}
        <tbody>
        { list.map((looper, idx) => <TransactionItem key={ idx } data={ looper } />) }
        </tbody>
      </Table>
    </Box>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionView)
