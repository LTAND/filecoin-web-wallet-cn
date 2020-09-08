import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Glyph, Text } from '../../Shared'

const CreateWallet = ({ onClick, ...props }) => (
  <Card
    css={`
      cursor: pointer;
      transition: 0.13s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    `}
    role='button'
    onClick={onClick}
    display='flex'
    flexDirection='column'
    justifyContent='space-between'
    alignContent='space-between'
    // height={7}
    p={2}
    {...props}
  >
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-around'>
        {/* <Glyph acronym='Sp' border={0} /> */}
        <Text ml={4} my={0} margin={2}>
          创建钱包助记词
        </Text>
      </Box>
    </Box>
  </Card>
)

CreateWallet.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CreateWallet
