import React from 'react'
import { string } from 'prop-types'
import Box from '../Box'
import { IconGlif } from '../Icons'
import { Header } from '../Typography'

const HeaderGlyph = ({ alt, color, text, imageUrl }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      margin='auto'
      py={2}
      mr={[0, 6]}
      mb={[3, 0]}
      px={3}
      borderRadius={2}
      width="100%"
      height='200px'
      // background: url(${imageUrl}) center no-repeat;
      css={`
        background: url("/logo-plus.png") center no-repeat;
        background-size: 372px 117px;
        border-radius: 10px;
        alt: ${alt};
      `}
    >
      {/* <IconGlif
        fill='#fff'
        size={7}
        css={`
          transform: rotate(-90deg);
        `}
      /> */}
      {/* <Header color={color} ml={3}>
        {text}
      </Header> */}
    </Box>
  )
}

HeaderGlyph.propTypes = {
  alt: string,
  text: string.isRequired,
  imageUrl: string.isRequired,
  color: string
}

HeaderGlyph.defaultProps = {
  alt: '',
  color: 'core.black'
}

export default HeaderGlyph
