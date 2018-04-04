import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Section from 'grommet/components/Section'
import FormFields from 'grommet/components/FormFields'
import Form from 'grommet/components/Form'
import Footer from 'grommet/components/Footer'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import Article from 'grommet/components/Article'
import PasswordInput from 'grommet/components/PasswordInput'
import bip39 from 'bip39'
import UnLockView from '../UnLockView'
import * as WalletActions from '../../actions/wallet'

const { ipcRenderer } = require('electron')

type Props = {
  wallet: any,
  server: any
};

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    server: state.server.config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WalletActions, dispatch)
}

class ImportView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = { seed: bip39.generateMnemonic() }
  }

  onSubmit = (event) => {
    event.preventDefault()
  }
  onChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value, passwordError: null })
  }
  goSaveStep = (event) => {
    event.preventDefault()
    const { password, seed } = this.state
    if (!password) {
      this.setState({ passwordError: 'Please type your new password!' })
    } else {
      // save json file
      const { network: { name } } = this.props.server
      ipcRenderer.send('save-wallet', { seed, password, network: name })
      ipcRenderer.on('save-wallet-result', (event, error) => {
        if (error) {
          // failt to save
        } else {
          // ok, so go next view
          // TODO
        }
      })
    }
  }

  render() {
    const { wallet: { current } } = this.props
    const { encrypted } = current
    const { seed, passwordError } = this.state
    console.log(this.props.wallet)
    return (
      <Article colorIndex="grey-4" justify="center" align="center" flex="grow" style={ { height: 'calc(100vh)' } }>
        <Section justify="center" align="center">
          <Form onSubmit={ this.onSubmit }>
            <FormFields>
              <fieldset>
                <legend>Create a new wallet:</legend>
                <FormField label="Seed:" htmlFor="cf-seed">
                  <input id="cf-seed" name="seed" type="text" value={ seed } disabled />
                </FormField>
                <FormField label="Password:" htmlFor="cf-password" error={ passwordError }>
                  <PasswordInput id="cf-password" name="password" onChange={ this.onChange } />
                </FormField>
              </fieldset>
            </FormFields>
            <Footer pad={ { vertical: 'medium' } } justify="center">
              <Button label="Create" onClick={ this.goSaveStep } primary />
            </Footer>
          </Form>
        </Section>
        { encrypted && <Section><UnLockView /></Section> }
      </Article>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportView)
