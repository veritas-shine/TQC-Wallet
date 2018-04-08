// @flow
import React, { Component } from 'react'
import LinkNext from 'grommet/components/icons/base/LinkNext'
import ListItem from 'grommet/components/ListItem'
import pqccore from 'pqc-core'
import UnitView from './UnitView'

const { UnitMap } = UnitView

const { base58check } = pqccore.Encoding

type Props = {
  myAddress: string,
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

/**
 *
 * @param address {String}
 * @param myAddress {String}
 * @return {string}
 */
function displayAddress(address, myAddress) {
  const nameStyle = {
    background: '#865cd6',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3
  }
  return address === myAddress ? (<span style={ nameStyle }>me</span>) : address
}

export default class TransactionItem extends Component<Props> {
  props: Props;

  render() {
    const { data, network, myAddress } = this.props
    const { inputs, outputs } = data
    const prefix = Buffer.from([network])
    const wrapperStyle = {
      display: 'flex',
      width: '100%',
      flexDirection: 'column'
    }
    const contentStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    if (outputs.length === 1) {
      // is coinbase
      const input = inputs[0]
      const output = outputs[0]
      const address = hashToAddress(prefix, output.publicKeyHash)
      const buffer = Buffer.from(input.signature, 'hex')
      return (
        <ListItem justify="between">
          <div style={ wrapperStyle }>
            <div>{ data.txid }</div>
            <div style={ contentStyle }>
              <div style={ { flexGrow: 1, display: 'flex' } }>{ output.amount / UnitMap.TQC } TQC</div>
              <div style={ { flexGrow: 50, maxWidth: '50%', display: 'flex' } }>{ buffer.toString('utf8') }</div>
              <div style={ { flexGrow: 1, display: 'flex' } }><LinkNext /></div>
              <div style={ { flexGrow: 10, display: 'flex' } }>{ displayAddress(address, myAddress) }</div>
            </div>
          </div>
        </ListItem>
      )
    } else {
      return (
        <ListItem justify="between">
          <div style={ wrapperStyle }>
            <div>{ data.txid }</div>
            <div style={ contentStyle }>
              <div className="inputs" style={ { flexGrow: 50, maxWidth: '50%', display: 'flex' } }>
                {
                  inputs.map((looper, idx) => <div key={ idx } style={{display: 'flex'}}>{ 1 } TQC from</div>)
                }
              </div>
              <div><LinkNext /></div>
              <div className="outputs" style={ { flexGrow: 10, display: 'flex', flexDirection: 'column' } }>
                {
                  outputs.map((looper, idx) => <div key={ idx } style={{display: 'flex'}}>
                    { looper.amount / UnitMap.TQC } TQC
                    to { displayAddress(hashToAddress(prefix, looper.publicKeyHash), myAddress) }
                  </div>)
                }
              </div>
            </div>
          </div>
        </ListItem>
      )
    }
  }
}
