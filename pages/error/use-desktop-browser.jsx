import React from 'react'
import { useRouter } from 'next/router'
import { IconSpaceCraft, Box, BigTitle, Title, Button } from '../../components/Shared'


export default () => {
  const router = useRouter()
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      width='100%'
      p={4}
    >
      <Box textAlign='center' px={5}>
        <Box
          display='inline-block'
          margin='0 auto'
          borderRadius={3}
          py={1}
          px={1}
          border={1}
          borderColor='status.fail.background'
          bg='status.fail.background'
        >
          {/* <IconGlif fill='status.fail.foreground' size={7} /> */}
          <IconSpaceCraft/>
        </Box>
        <BigTitle my={5}>抱歉</BigTitle>
        <Title my={5} textAlign='left'>
          目前钱包功能尚未支持手机或平板访问
        </Title>
        <Title my={5} textAlign='left'>
          请使用电脑端访问它
        </Title>
        <Button
          mt={5}
          variant='secondary'
          title='Home'
          onClick={() => router.push('/')}
        />
      </Box>
    </Box>
  )
}
