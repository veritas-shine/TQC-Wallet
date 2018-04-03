// @flow
import React, { Component } from 'react'
import TableRow from 'grommet/components/TableRow'
import moment from 'moment'
import { Link } from 'react-router-dom'

type Props = {
  data: any
};

export default class TransactionItem extends Component<Props> {
  props: Props;

  render() {
    const {data} = this.props
    return (
      <TableRow>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </TableRow>
    );
  }
}

TransactionItem.Column = (<thead>
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
