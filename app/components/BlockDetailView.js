// @flow
import React, { Component } from 'react'
import Section from 'grommet/components/Section'
import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious'
import Anchor from 'grommet/components/Anchor'
import Table from 'grommet/components/Table'
import TableRow from 'grommet/components/TableRow'
import List from 'grommet/components/List'
import moment from 'moment'
import { connect } from 'react-redux'
import TransactionItem from './TransactionItem'

type Props = {
  wallet: any,
  data: any,
  server: any,
  goBack: () => void
};

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    server: state.server
  };
}

class BlockDetailView extends Component<Props> {
  props: Props;

  componentWillMount() {
    console.log(19, this.props)
  }

  render() {
    const { data, server, wallet: { current } } = this.props
    const { network: { publicKeyHash } } = server.config
    const myAddress = current.address
    const tx = data.transactions[0]
    const { signature } = tx.inputs[0]
    const buffer = Buffer.from(signature, 'hex')
    const style = {
      borderBottom: '1px solid #2A2929',
      padding: 16,
      fontSize: '1.4em',
      textAlign: 'center'
    }
    return (<Article style={ { paddingLeft: 20, paddingRight: 20 } }>
        <Header justify="between" style={ { borderBottom: '1px solid #2A2929' } }>
          <Anchor primary icon={ <LinkPrevious /> } href="#" label="Back" onClick={ this.props.goBack } />
          <h2 style={ { marginLeft: -82 } }>Block #{ data.height }</h2>
          <div />
        </Header>
        <Section style={ { padding: 0, borderBottom: '1px solid #2A2929' } }>
          <Table>
            <thead></thead>
            <tbody>
            <TableRow>
              <td>Hash</td>
              <td colSpan={ 3 }>{ data.hash }</td>
            </TableRow>
            <TableRow>
              <td>Previous Hash</td>
              <td colSpan={ 3 }>{ data.prevHash }</td>
            </TableRow>
            <TableRow>
              <td>Merkle Root</td>
              <td colSpan={ 3 }>{ data.merkleRoot }</td>
            </TableRow>
            <TableRow>
              <td>Time</td>
              <td>{ moment(data.time * 1000).format('YYYY-MM-DD HH:mm:ss') }</td>
              <td>Qbits</td>
              <td>0x{ data.qbits.toString(16) }</td>
            </TableRow>
            <TableRow>
              <td>Nonce</td>
              <td>{ data.nonce }</td>
              <td>Version</td>
              <td>{ data.version }</td>
            </TableRow>
            <TableRow>
              <td>Transactions</td>
              <td>{ data.transactions.length }</td>
              <td>Coinbase</td>
              <td>{ buffer.toString('utf8') }</td>
            </TableRow>
            </tbody>
          </Table>
        </Section>
        <h2 style={ style }>Transactions:</h2>
        <List>
          { data.transactions.map((looper, idx) =>
            (<TransactionItem key={ idx } data={ looper } network={ publicKeyHash } myAddress={ myAddress } />)) }
        </List>
      </Article>
    );
  }
}

export default connect(mapStateToProps)(BlockDetailView)
