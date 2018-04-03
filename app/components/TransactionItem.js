// @flow
import React, { Component } from 'react'
import LinkNext from 'grommet/components/icons/base/LinkNext'
import ListItem from 'grommet/components/ListItem'

type Props = {
  data: any
};

export default class TransactionItem extends Component<Props> {
  props: Props;

  render() {
    const {data} = this.props
    const {inputs, outputs} = data
    if (outputs.length === 1) {
      // is coinbase
      const input = inputs[0]
      const output = outputs[0]
      return (
        <ListItem>
          <div>{output.amount} TQC</div>
          <div>New Mined</div>
          <div><LinkNext /></div>
          <div>{output.publicKeyHash.toString('hex')}</div>
        </ListItem>
      )
    }
    return (
      <div>
      </div>
    )
  }
}
