import React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Card, Text, Glyph } from '../../../Shared'
import useReset from '../../../../utils/useReset'
import { IconTips } from '../../../Shared/Icons'

const Back = ({ setReturningHome }) => {
  const resetState = useReset()
  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={8} margin='auto'>
      <Card
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        width='80vw'
        maxWidth={600}
      >
        {/* <Glyph acronym='Bk' /> */}
        <IconTips />
        <Text>你是否要退出到主页</Text>
      </Card>
      <Box mt={6} display='flex' justifyContent='space-between' width='100%'>
        <Button
          title='返回'
          onClick={() => setReturningHome(false)}
          variant='secondary'
          mr={2}
        />
        <Button
          title='退出到主页'
          onClick={() => resetState()}
          variant='primary'
          ml={2}
        />
      </Box>
    </Box>
  )
}

Back.propTypes = {
  setReturningHome: PropTypes.func.isRequired
}

export default Back
