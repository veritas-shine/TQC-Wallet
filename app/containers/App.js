// @flow
import * as React from 'react'
import App from 'grommet/components/App'

type Props = {
  children: React.Node
};

export default class MainApp extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <App colorIndex="grey-4">
        {this.props.children}
      </App>
    );
  }
}
