import React, { PureComponent } from 'react'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'

import * as BlockActions from '../actions/block'
import BlockItem from '../components/BlockItem'

type Props = {
  block: any,
  getBlockList: () => void,
  searchBlockByID: ({ id: string }) => void
}

function mapStateToProps(state) {
  return {
    block: state.block
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BlockActions, dispatch)
}

class BlockView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    this.props.getBlockList()
  }

  handleChange = event => {
    const { value } = event.target
    this.setState({ search: value })
  }

  handleSearch = event => {
    if (event.keyCode === 13) {
      const { search } = this.state
      this.props.searchBlockByID({ id: search })
    }
  }

  render() {
    const { block: { list } } = this.props
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
            placeHolder="Block ID"
            dropAlign={ { right: 'right' } }
            onDOMChange={ this.handleChange }
            onKeyDown={ this.handleSearch }
          />
        </Box>
      </Header>
      <Table>
        {BlockItem.Column}
        <tbody>
        { list.map((looper, idx) => <BlockItem key={ idx } data={ looper } />) }
        </tbody>
      </Table>
    </Box>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockView)
