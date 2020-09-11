import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  Box,
  IconLedger,
  Text,
  Title,
  Button,
  Header,
  Warning,
  Glyph,
  InlineBox
} from '../../Shared'
import HeaderGlyph from '../../Shared/Glyph/HeaderGlyph'
import ImportWallet from './Import'
import CreateWallet from './Create'
import {
  LEDGER,
  IMPORT_MNEMONIC,
  CREATE_MNEMONIC,
  IMPORT_SINGLE_KEY
} from '../../../constants'
import { useWalletProvider } from '../../../WalletProvider'
import { width } from 'styled-system'

const DevMode = styled(ImportWallet)``

export default () => {
  const { setWalletType } = useWalletProvider()
  // this could be cleaner, but we use this to more easily navigate to/from the warning card
  const [localWalletType, setLocalWalletType] = useState(null)
  const router = useRouter()

  const onChoose = type => {
    if (
      !localWalletType &&
      (type === CREATE_MNEMONIC ||
        type === IMPORT_MNEMONIC ||
        type === IMPORT_SINGLE_KEY)
    ) {
      setLocalWalletType(type)
    } else if (localWalletType) {
      setWalletType(localWalletType)
    } else {
      setWalletType(type)
    }
  }

  const [devMode, setDevMode] = useState(false)

  return (
    <>
      {localWalletType ? (
        <Warning
          title='提示'
          description='我们不建议您使用此帐户来持有或交易大量Filecoin。此帐户仅用于测试目的。对于大笔款项，Glif仅应与Ledger硬件钱包一起使用。'
          linkDisplay=""
          linkhref='https://coinsutra.com/security-risks-bitcoin-wallets/'
          onBack={() => setLocalWalletType(null)}
          onAccept={onChoose}
        />
      ) : (
          <Box
            display='flex'
            flexWrap='wrap'
            minHeight='640px'
            height='90vh'
            alignItems='center'
            justifyContent='flex-start'
            flexGrow='1'
            width='80vw'
            margin='0 40px'
            borderRadius="25px"
            boxShadow="0 0 20px #a9a9a9"
          >
            <Box
              height='100%'
              display='flex'
              width='100%'
              flexDirection='column'
              alignItems='center'
              justifyContent="flex-start"
              alignContent='flex-start'
              mb={0}
              p={4}
              margin='auto'
            >
              <HeaderGlyph
                alt='Source: https://www.nontemporary.com/post/190437968500'
                text='Wallet'
                imageUrl='/imgwallet.png'
                color='black'
                fill='black'
                height="100px"
                width="auto"
              />
              <Box
                display='flex'
                flexDirection='column'
                mt={[2, 4, 4]}
                alignSelf='center'
                textAlign='left'
              >
                <Header >
                  Filecoin轻量级钱包
                </Header>
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                flexGrow='1'
                flexWrap='wrap'
                justifyContent='space-evenly'
                margin='auto'
                mt={6}
              >
                <Box
                  display='flex'
                  justifyContent='center'
                  flexDirection='column'
                  alignItems='center'
                  textAlign='center'
                  flexGrow='1'
                >
                  {!devMode && (
                    <ImportWallet
                      onClick={() => onChoose(LEDGER)}
                      Icon={IconLedger}
                      title='连接钱包设备'
                      tag='Most Secure'
                      display='flex'
                      justifyContent='space-between'
                      flexDirection='column'
                      mb={4}
                      borderRadius={10}
                    />
                  )}


                  {/* <Text>Access via</Text> */}
                  {/* <Text mt={0} maxWidth={11}>
                    安全地生成一个帐户来接收您的SAFT文件
                  </Text> */}
                  {!devMode && (
                    <ImportWallet
                      mb={4}
                      alignSelf='center'
                      onClick={() => router.push('/vault')}
                      glyphAcronym='Ss'
                      title='SAFT 项目'
                      borderRadius={10}
                    />)}

                  {devMode && (
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignSelf='center'
                      bg='background.white'
                      width={400}
                      p={3}
                      border={1}
                      borderWidth={1}
                      overflow='hidden'
                      mt={3}
                      border={1}
                      borderRadius={10}
                      margin="auto"
                    >
                      <Box display='flex' alignItems='center' m={2} px={2} justifyContent='space-around'>
                        {/* <Glyph border={1} acronym='Dm' /> */}
                        <Text ml={4} my={0} fontsize={24} margin='auto'>
                          用户模式
                        </Text>
                      </Box>
                      <CreateWallet
                        onClick={() => onChoose(CREATE_MNEMONIC)}
                        m={2}
                        width={`96%`}
                        borderRadius={10}
                      />

                      <ImportWallet
                        onClick={() => onChoose(IMPORT_MNEMONIC)}
                        glyphAcronym='Sp'
                        title='导入钱包助记词'
                        width={`96%`}
                        borderRadius={10}
                        m={2}
                      />
                      {/* <ImportWallet
                    onClick={() => onChoose(IMPORT_SINGLE_KEY)}
                    glyphAcronym='Pk'
                    title='导入私钥'
                    m={2}
                  /> */}
                      <Button
                        variant='tertiary'
                        title='关闭'
                        color='core.black'
                        m={2}
                        border={0}
                        p={0}
                        onClick={() => setDevMode(false)}
                      >
                        CLOSE
                      </Button>
                    </Box>
                  )}
                  {!devMode && (
                    <DevMode
                      alignSelf='center'
                      onClick={() => setDevMode(true)}
                      glyphAcronym='Dm'
                      title='用户模式'
                      justifyContent='space-around'
                      borderRadius={10}
                    />
                  )}
                </Box>
              </Box>
              {/* <Box
                // display='flex'
                // alignItems='center'
                // justifyContent='space-between'
                margin='auto'
                py={2}
                mt={2}
                mb={[3, 0]}
                px={3}
                borderRadius={2}
                width="100%"
                height='200px'
                float="right"
                // background: url(${imageUrl}) center no-repeat;
                css={`
                  background: url("/static/astronaut.png") right no-repeat;
                  background-size: 200px 256px;
              `}
              >

              </Box> */}
            </Box>

          </Box>
        )}
    </>
  )
}
