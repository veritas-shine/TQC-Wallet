import React, { PureComponent } from 'react'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../../actions/server'

type Props = {
  server: any,
  startMine: () => void,
  pruneTXs: () => void
};

function mapStateToProps(state) {
  return {
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch)
}

class DebugView extends PureComponent<Props> {
  props: Props

  tryToMine = () => {
    this.props.startMine((code) => {
      console.log(code)
    })
  }

  pruneTXs = () => {
    this.props.pruneTXs((code) => {
      console.log(code)
    })
  }

  render() {
    return (
      <Box style={ { padding: '20px' } } justify="center" align="center">
        <Button label="Mine a Block" primary onClick={ this.tryToMine } />
        <Button label="Prune TXs" primary onClick={ this.pruneTXs } />
      </Box>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugView)
