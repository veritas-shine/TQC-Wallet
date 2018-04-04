import React from 'react'
import Box from 'grommet/components/Box'
import Label from 'grommet/components/Label'
import Paragraph from 'grommet/components/Paragraph'
import Footer from 'grommet/components/Footer'

export default () => (<Footer justify='between' pad="small" style={ { padding: '10px 40px 24px' } }>
  <Label>
    TQC Wallet
  </Label>
  <Box direction='row'
       align='center'
       pad={ { "between": "medium" } }>
    <Paragraph margin='none'>
      © 2018 TQC Wallet
    </Paragraph>
  </Box>
</Footer>)
