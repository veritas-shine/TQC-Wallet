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

type Props = {
  wallet: any
};

function mapStateToProps(state) {
  return {
    wallet: state.wallet
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

  render() {
    const { wallet: { current } } = this.props
    const { encrypted } = current
    const { seed } = this.state
    console.log(this.props.wallet)
    return (<Article colorIndex="grey-4" justify="center" align="center" flex="grow" style={{height: 'calc(100vh)'}}>
      <Section justify="center" align="center">
        <Form onSubmit={ this.onSubmit }>
          <FormFields>
            <fieldset>
              <legend>Create a new wallet:</legend>
              <FormField label="Seed:" htmlFor="cf-seed">
                <input id="cf-seed" name="seed" type="text" value={ seed } disabled />
              </FormField>
              <FormField label="Password:" htmlFor="cf-password">
                <PasswordInput id="cf-password" name="password" onChange={ this._onChange } />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad={ { vertical: 'medium' } } justify="center">
            <Button label="Submit" type="submit" primary />
          </Footer>
        </Form>
      </Section>
      { encrypted && <Section><UnLockView /></Section> }
    </Article>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportView)
