// @flow
import React, { Component } from 'react'
import LinkNext from 'grommet/components/icons/base/LinkNext'
import ListItem from 'grommet/components/ListItem'
import pqccore from 'pqc-core'

const {base58check} = pqccore.Encoding

type Props = {
  data: any,
  network: any
};

export default class TransactionItem extends Component<Props> {
  props: Props;

  render() {
    const {data, network} = this.props
    const {inputs, outputs} = data
    if (outputs.length === 1) {
      // is coinbase
      const input = inputs[0]
      const output = outputs[0]
      console.log(17, output.publicKeyHash)
      console.log(25, network)
      const prefix = Buffer.from([0x30])
      const buffer = Buffer.from(output.publicKeyHash, 'hex')
      const address = base58check.encode(Buffer.concat([prefix, buffer]))
      return (
        <ListItem>
          <div>{output.amount} TQC</div>
          <div>New Mined</div>
          <div><LinkNext /></div>
          <div>{address}</div>
        </ListItem>
      )
    }
    return (
      <div>
      </div>
    )
  }
}
