import React, { PureComponent } from 'react'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import Box from 'grommet/components/Box'
import PasswordInput from 'grommet/components/PasswordInput'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as walletActions from '../actions/wallet'

type Props = {
  wallet: any,
  unlockWallet: () => void
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(walletActions, dispatch)
}

class UnLockView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  _onChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }
  onSubmit = (event) => {
    event.preventDefault()
    this.props.unlockWallet({ password: this.state.password })
    console.log(40, this.state)
  }

  render() {
    return (<Box align="center" justify="center">
      <Form onSubmit={ this.onSubmit }>
        <FormFields>
          <fieldset>
            <legend>Unlock your wallet:</legend>
            <FormField label="Password:" htmlFor="uvpassword">
              <PasswordInput id="uvpassword" name="password" onChange={ this._onChange } />
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

export default connect(mapStateToProps, mapDispatchToProps)(UnLockView)
