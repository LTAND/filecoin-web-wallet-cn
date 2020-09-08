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

  const style_content = {
    // background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    //linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)
    width: "80vw",
    minHeight: "575px",
    minWidth: "412px",
    margin: "40px 0",
    borderRadius: "25px",
    boxShadow: "0 0 20px #a9a9a9"
  }

  const style_header = {
    // color: "white",
    fontsize: "12px"
  }

  const style_usermode = {
    minWidth: "400px",
    width: "540px",
    borderRadius: "10px",
    textAlign: "center"
  }

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
            minHeight='90vh'
            alignItems='center'
            justifyContent='flex-start'
            flexGrow='1'
            style={style_content}
          >
            <Box
              display='flex'
              width='100%'
              flexDirection='column'
              alignItems='center'
              justifyContent="flex-start"
              alignContent='flex-start'
              mb={4}
              p={4}
              margin='auto'
              marginBottom={0}
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
                <Header style={style_header}>
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
              >
                <Box
                  display='flex'
                  justifyContent='center'
                  flexDirection='column'
                  alignItems='center'
                  textAlign='center'
                  flexGrow='1'
                >
                  {/* <Text>Access via</Text>
              <ImportWallet
                onClick={() => onChoose(LEDGER)}
                Icon={IconLedger}
                title='连接钱包设备'
                tag='Most Secure'
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                mb={6}
              />
              {/* <Text mt={0} maxWidth={11}>
                  安全地生成一个帐户来接收您的SAFT文件
              </Text> */}
                  <ImportWallet
                    mb={4}
                    alignSelf='center'
                    onClick={() => router.push('/vault')}
                    glyphAcronym='Ss'
                    title='SAFT 项目'
                    width={540}
                    margin={4}
                    borderRadius={10}
                  />

                  {devMode && (
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignSelf='center'
                      bg='background.white'
                      mt={3}
                      px={3}
                      py={3}
                      border={1}
                      borderRadius={10}
                      width="100%"
                      maxWidth={540}
                      minWidth={300}
                      margin="auto"
                      // marginBottom={40}
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
                </Box>
                {!devMode && (
                  <DevMode
                    mt={1}
                    alignSelf='center'
                    onClick={() => setDevMode(true)}
                    glyphAcronym='Dm'
                    title='用户模式'
                    style={style_usermode}
                    justifyContent='space-around'
                  />
                )}
              </Box>
            </Box>

          </Box>
        )}
    </>
  )
}
