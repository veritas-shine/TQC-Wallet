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
      <App>
        {this.props.children}
      </App>
    );
  }
}
