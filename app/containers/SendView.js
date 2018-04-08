import React, { PureComponent } from 'react'
import Header from 'grommet/components/Header'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import Box from 'grommet/components/Box'
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious'
import pqccore from 'pqc-core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as transactionActions from '../actions/transaction'

const {base58check} = pqccore.Encoding

type Props = {
  transaction: any,
  hideSendView: () => void,
  createTransaction: () => void
}

function mapStateToProps(state) {
  return {
    transaction: state.transaction
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(transactionActions, dispatch)
}

class SendView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  _onChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }
  onSubmit = (event) => {
    event.preventDefault()
    const {address, amount} = this.state
    try {
      if (base58check.decode(address)) {
        // decode ok
        this.props.createTransaction({amount: parseFloat(amount), to: address}, message => {
          if (message) {
            // TODO
          } else {

          }
        })
      }
    } catch (e) {
      // error
      console.error(e)
      this.setState({addressError: e.message})
    }
  }

  render() {
    const {addressError} = this.state
    return (<Box align="center" justify="center">
      <Form onSubmit={ this.onSubmit }>
        <Header>
          <Button icon={ <LinkPrevious /> } label="Back" onClick={ this.props.hideSendView } plain />
        </Header>
        <FormFields>
          <fieldset>
            <legend>Send TQC:</legend>
            <FormField label="Address:" htmlFor="svaddress" error={addressError}>
              <input id="svaddress" name="address" type="text" onChange={ this._onChange } />
            </FormField>
            <FormField label="Amount:" htmlFor="svamount">
              <input id="svamount" name="amount" type="text" onChange={ this._onChange } />
            </FormField>
            <FormField label="Fee:" htmlFor="svfee">
              <input id="svfee" name="fee" type="text" disabled />
            </FormField>
          </fieldset>
        </FormFields>
        <Footer pad={ { vertical: 'medium' } } justify="center">
          <Button label="Submit" type="submit" primary />
        </Footer>
      </Form>
    </Box>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendView)
