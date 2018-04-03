// @flow
import React, { Component } from 'react'
import Title from 'grommet/components/Title'
import TableRow from 'grommet/components/TableRow'
import Timestamp from 'grommet/components/Timestamp'
import moment from 'moment'
import { Link } from 'react-router-dom'

type Props = {
  data: any
};

export default class BlockItem extends Component<Props> {
  props: Props;

  render() {
    const {data} = this.props
    const tx = data.transactions[0]
    const {signature} = tx.inputs[0]
    const buffer = Buffer.from(signature, 'hex')
    return (
      <TableRow>
        <td>
          <Link to={`/block/${data.hash}`}>{data.height}</Link>
        </td>
        <td>
          {buffer.toString('utf8')}
        </td>
        <td>
          {moment(data.time * 1000).format('YYYY-MM-DD HH:mm:ss')}
        </td>
        <td>
          {data.transactions.length}
        </td>
        <td>
          {data.size}
        </td>
      </TableRow>
    );
  }
}

BlockItem.Column = (<thead>
<tr>
  <th>
    Height
  </th>
  <th>
    Coinbase
  </th>
  <th>
    Time
  </th>
  <th>
    Transactions
  </th>
  <th>
    Size
  </th>
</tr>
</thead>)
