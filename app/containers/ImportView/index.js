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
import CopyIcon from 'grommet/components/icons/base/Copy'
import swal from 'sweetalert2'
import bip39 from 'bip39'
import * as serverActions from '../../actions/server'

const { ipcRenderer } = require('electron')

type Props = {
  wallet: any,
  server: any,
  reloadServer: () => void,
  needReloadView: () => void
};

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    server: state.server.config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch)
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
      ipcRenderer.on('save-wallet-result', (event, data) => {
        // ok, so go next view
        // TODO
        this.props.reloadServer()
        this.props.needReloadView()
      })
    }
  }

  handleCopy = (event) => {
    event.preventDefault()
    const {seed} = this.state
    ipcRenderer.send('copy-clipboard', seed)
    ipcRenderer.on('copy-clipboard-result', (e, data) => {
      swal('Seed copied to clipboard')
    })
  }

  render() {
    const { wallet: { current } } = this.props
    const { seed, passwordError } = this.state
    return (
      <Article colorIndex="grey-4" justify="center" align="center" flex="grow" style={ { height: 'calc(100vh)' } }>
        <Section justify="center" align="center">
          <Form onSubmit={ this.onSubmit }>
            <FormFields>
              <fieldset>
                <legend>Create a new wallet:</legend>
                <FormField label="Seed:" htmlFor="cf-seed">
                  <div className="grommetux-password-input">
                    <textarea id="cf-seed" rows={2} name="seed" value={ seed } disabled style={{width: '100%'}} />
                    <Button icon={<CopyIcon />} style={{position: 'absolute', right: '6px', top: '24px'}} plain onClick={this.handleCopy} />
                  </div>
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
      </Article>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportView)
