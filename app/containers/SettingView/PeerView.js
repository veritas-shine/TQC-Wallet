import React, { PureComponent } from 'react'
import Box from 'grommet/components/Box'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../../actions/server'

type Props = {
  peer: any
};

function mapStateToProps(state) {
  return {
    peer: state.peer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch)
}

class PeerView extends PureComponent<Props> {
  props: Props

  render() {
    return (
      <List style={ { padding: '20px' } } justify="center" align="center">
      </List>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerView)
