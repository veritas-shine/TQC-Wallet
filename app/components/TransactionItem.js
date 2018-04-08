// @flow
import React, { Component } from 'react'
import LinkNext from 'grommet/components/icons/base/LinkNext'
import ListItem from 'grommet/components/ListItem'
import pqccore from 'pqc-core'
import UnitView from './UnitView'

const { UnitMap } = UnitView

const { base58check } = pqccore.Encoding

type Props = {
  data: any,
  network: any
};

/**
 * convert public key hash to address
 * @param network {Buffer}
 * @param hash {String}
 */
function hashToAddress(network, hash) {
  const buffer = Buffer.from(hash, 'hex')
  return base58check.encode(Buffer.concat([network, buffer]))
}

export default class TransactionItem extends Component<Props> {
  props: Props;

  render() {
    const { data, network } = this.props
    const { inputs, outputs } = data
    const prefix = Buffer.from([network])

    if (outputs.length === 1) {
      // is coinbase
      const output = outputs[0]
      const address = hashToAddress(prefix, output.publicKeyHash)
      return (
        <ListItem justify="between">
          <div>{ output.amount / UnitMap.TQC } TQC</div>
          <div>New Mined</div>
          <div><LinkNext /></div>
          <div>{ address }</div>
        </ListItem>
      )
    } else {
      return (
        <ListItem justify="between">
          <div className="inputs">
            {
              inputs.map((looper, idx) => <div key={ idx }>{ 1 } TQC from</div>)
            }
          </div>
          <div><LinkNext /></div>
          <div className="outputs">
            {
              outputs.map((looper, idx) => <div key={ idx }>
                { looper.amount / UnitMap.TQC } TQC to { hashToAddress(prefix, looper.publicKeyHash) }
              </div>)
            }
          </div>
        </ListItem>
      )
    }
  }
}
