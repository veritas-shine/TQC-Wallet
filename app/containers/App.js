// @flow
import * as React from 'react'
import App from 'grommet/components/App'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as serverActions from '../actions/server'

type Props = {
  children: React.Node,
  getServerConfig: () => void
};

function mapStateToProps(state) {
  return {
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(serverActions, dispatch)
}

class MainApp extends React.Component<Props> {
  props: Props
  componentWillMount() {
    this.props.getServerConfig()
  }
  render() {
    return (
      <App>
        {this.props.children}
      </App>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
