import React, { PureComponent } from 'react'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

type Props = {
  didUnitChanged: () => void
};

const kUnitMap = {
  TQC: 1e8,
  mTQC: 1e5,
  uTQC: 1e2,
  glv: 1
}

export default class UnitView extends PureComponent<Props> {
  props: Props

  constructor(props, context) {
    super(props, context)
    this.state = { unit: 'TQC' }
  }

  changeUnit = (unit) => {
    this.setState({ unit })
    this.props.didUnitChanged(unit, kUnitMap[unit])
  }

  render() {
    const { unit } = this.state
    const getClass = (u) => (u === unit ? 'active' : '')
    const {didUnitChanged, ...rest} = this.props
    return (<Menu label={ unit } {...rest}>
      <Anchor href="#" className={ getClass('TQC') } onClick={ () => this.changeUnit('TQC') }>
        TQC
      </Anchor>
      <Anchor href="#" className={ getClass('mTQC') } onClick={ () => this.changeUnit('mTQC') }>
        mTQC
      </Anchor>
      <Anchor href="#" className={ getClass('uTQC') } onClick={ () => this.changeUnit('uTQC') }>
        uTQC
      </Anchor>
    </Menu>)
  }
}

UnitView.UnitMap = kUnitMap
