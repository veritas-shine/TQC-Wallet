// @flow
import React, { Component } from 'react'
import TableRow from 'grommet/components/TableRow'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {formatTime} from '../utils/time'

type Props = {
  now: any,
  data: any,
  showBlockDetail: () => void
};

export default class BlockItem extends Component<Props> {
  props: Props;
  showDetail = (event) => {
    event.preventDefault()
    const {data, showBlockDetail} = this.props
    showBlockDetail(data)
  }
  render() {
    const {data, now} = this.props
    const tx = data.transactions[0]
    const {signature} = tx.inputs[0]
    const buffer = Buffer.from(signature, 'hex')
    return (
      <TableRow>
        <td>
          <Link to={`/block/${data.hash}`} onClick={this.showDetail}>{data.height}</Link>
        </td>
        <td>
          {buffer.toString('utf8')}
        </td>
        <td>
          {formatTime(moment(data.time * 1000), now)}
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
