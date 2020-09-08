import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { space, layout, typography, border, color } from 'styled-system'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Title,
  Text,
  HeaderGlyph,
  Header,
  InlineBox,
  Menu,
  MenuItem
} from '../Shared'

const ButtonSignUp = styled.button`
  outline: none;
  border: 0;
  cursor: pointer;
  background: transparent;
  transition: 0.18s ease-in;

  &:hover {
    opacity: 0.8;
  }
  ${space}
  ${layout}
  ${typography}
  ${border} 
  ${color}
`

const InputEmail = styled.input`
  outline: 0;
  border: 0;
  ::placeholder {
    color: #444;
  }
  ${space}
  ${layout}
  ${typography}
  ${border}
  ${color}
`

export default () => {
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const postToMailChimp = async () => {
    if (!email) {
      setError('请输入你的邮箱')
      return
    }
    setError('')
    try {
      const res = await axios.post(
        `https://mailchimp-proxy.openworklabs.com/saft?email=${email.trim()}`
      )

      if (res.data.indexOf('success') === -1) {
        if (res.data.indexOf('already subscribed') > -1) {
          setError("You're already subscribed. :)")
          return
        }

        setError(
          "There was an issue getting you subscribed. We're on the case!"
        )
      } else {
        setSubscribed(true)
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      minHeight='100vh'
      padding='auto'
      alignItems='center'
      justifyContent='center'
      flexGrow='1'
    >
      <Box
        display='flex'
        width={"100%"}
        // maxWidth={13}
        flexDirection='column'
        alignItems='flex-start'
        alignContent='flex-start'
        mb={4}
        p={4}
        margin='auto'
      >
        <HeaderGlyph
          alt='Source: https://unsplash.com/photos/OVO8nK-7Rfs'
          text='VAULT'
          imageUrl='/imgvault.png'
          color='white'
          fill='white'
          height="100px"
          width="auto"
          margin={0}
        />

        <Box
          display='flex'
          flexDirection='column'
          mt={[2, 4, 4]}
          alignSelf='center'
          textAlign='left'
          width='100%'
        >
          <Header textAlign='center'>使用钱包设备保存</Header>
          <Header textAlign='center'> Filecoin SAFT</Header>
          <Title mt={3} lineHeight='140%' textAlign='center'>
            <InlineBox
              backgroundColor='status.warning.background'
              color='status.warning.foreground'
              py={1}
              px={3}
              mr={2}
              my={3}
              fontSize={4}
              borderRadius={6}
            >
              这一周启动中
            </InlineBox>
          </Title>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width='100%'
          // minWidth={11}
          flexGrow='1'
          flexWrap='wrap'
          justifyContent='space-evenly'
          margin={`20px 0`}
        >
          <Box
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            textAlign='center'
            flexGrow='1'
            minWidth={400}
            width='100%'
          />
          <Menu
            position='relative'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
          >
            <MenuItem
              display='flex'
              flexWrap='wrap'
              justifyContent={['center', 'space-around']}
              width='100%'
              // maxWidth={12}

              color='core.darkgray'
              my={[2, 3]}
            >
              <>
                <Menu
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  flexDirection='column'
                >
                  <MenuItem>
                    <Title my={3} fontSize={30}>当我们启动时，你会收到电子邮件通知</Title>
                  </MenuItem>
                  <MenuItem textAlign='center' width='100%'>
                    <Box
                      display='flex'
                      flexWrap='wrap'
                      justifyContent='center'
                      maxWidth={16}
                    >
                      <InputEmail
                        width='100%'
                        fontSize={4}
                        color='core.nearblack'
                        border={1}
                        borderWidth={2}
                        px={3}
                        py={3}
                        textAlign='center'
                        placeholder='你的邮箱'
                        borderTopLeftRadius={4}
                        borderTopRightRadius={4}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <ButtonSignUp
                        width='100%'
                        color='core.white'
                        bg='core.nearblack'
                        fontSize={4}
                        border={1}
                        borderColor='core.nearblack'
                        borderWidth={2}
                        borderBottomLeftRadius={4}
                        borderBottomRightRadius={4}
                        px={6}
                        py={3}
                        height='max-content'
                        onClick={postToMailChimp}
                      >
                        提交
                    </ButtonSignUp>
                    </Box>
                    <Box textAlign='center' my={3}>
                      {error && <Text color='red'>{error}</Text>}
                      {subscribed && !error && (
                        <Text color='status.success.background'>
                          You&rsquo;re subscribed. Keep an eye out.
                        </Text>
                      )}
                    </Box>
                  </MenuItem>
                </Menu>
              </>
            </MenuItem>
          </Menu>
        </Box>
        <Button
          variant='tertiary'
          title='返回'
          color='core.black'
          m={2}
          border={1}
          p={0}
          onClick={() => router.push('/')}
        >
          CLOSE
        </Button>
      </Box>
    </Box>
  )
}
