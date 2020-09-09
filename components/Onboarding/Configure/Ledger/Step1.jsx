import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { IconConnect } from '../../../Shared/Icons'
import {
  Box,
  Button,
  OnboardCard,
  Text,
  Title,
  StepHeader
} from '../../../Shared'
import { IconLedger } from '../../../Shared/Icons'

import { useWalletProvider } from '../../../../WalletProvider'
import isDesktopChromeBrowser from '../../../../utils/isDesktopChromeBrowser'
import { hasLedgerError } from '../../../../utils/ledger/reportLedgerConfigError'
import useReset from '../../../../utils/useReset'

const Step1Helper = ({ inUseByAnotherApp, connectedFailure }) => {
  return (
    <Box
      display='block'
      flexDirection='column'
      justifyContent='space-between'
      borderColor='silver'
      mt={4}
      width={600}
      minHeight={9}
    >
      {connectedFailure && (
        <>
          <Box
            display='flex'
            alignItems='center'
            color='status.fail.foreground'
          >
            <Title>抱歉!</Title>
          </Box>
          <Box color='status.fail.foreground'>
            <Text mb={2}>无法连接当前钱包设备</Text>
            <Text>请你再一次解锁当前钱包设备</Text>
          </Box>
        </>
      )}
      {inUseByAnotherApp && (
        <>
          <Box
            display='flex'
            alignItems='center'
            color='status.fail.foreground'
          >
            <Title>抱歉!</Title>
          </Box>
          <Box color='status.fail.foreground'>
            <Text mb={2}>
              其他应用已连接到您的钱包设备
            </Text>
            <Text>
              请退出其他钱包设备后，再一次连接使用当前你的钱包设备
            </Text>
          </Box>
        </>
      )}
      {!inUseByAnotherApp && !connectedFailure && (
        <>
          <Box display='flex' alignItems='center' mt={4} color='core.nearblack'>
            <Title>连接</Title>
            <IconConnect ml={2}/>
          </Box>
          <Box color='core.nearblack' mt={5}>
            <Text>请连接钱包设备</Text>
          </Box>
        </>
      )}
    </Box>
  )
}

Step1Helper.propTypes = {
  connectedFailure: PropTypes.bool.isRequired,
  inUseByAnotherApp: PropTypes.bool.isRequired
}

const Step1 = ({ investor, setStep }) => {
  const { ledger, setLedgerProvider } = useWalletProvider()
  const router = useRouter()
  const resetState = useReset()
  if (!isDesktopChromeBrowser()) router.push(`/error/use-chrome`)
  const errFromRdx = useSelector(state => state.error)
  const error = hasLedgerError({ ...ledger, otherError: errFromRdx })

  const back = () => {
    if (investor) router.replace('/')
    else resetState()
  }

  return (
    <>
      <OnboardCard
        maxWidth={13}
        minHeight={9}
        width='100%'
        borderColor={error && 'status.fail.background'}
        bg={error ? 'status.fail.background' : 'core.transparent'}
      >
        <StepHeader
          currentStep={investor ? 2 : 1}
          loading={ledger.connecting}
          totalSteps={investor ? 5 : 2}
          // Icon={IconLedger}
          error={!!error}
          color={error ? 'status.fail.foreground' : 'core.transparent'}
        />
        <Step1Helper
          connectedFailure={ledger.connectedFailure}
          inUseByAnotherApp={ledger.inUseByAnotherApp}
        />
      </OnboardCard>
      <Box
        mt={6}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width='100%'
      >
        <Button title='返回' onClick={back} variant='secondary' mr={2} />
        <Button
          title='是的,我的钱包设备已连接'
          onClick={async () => {
            const provider = await setLedgerProvider()
            if (provider) setStep(2)
          }}
          variant='primary'
          ml={2}
        />
      </Box>
      
    </>
  )
}

Step1.propTypes = {
  setStep: PropTypes.func.isRequired,
  investor: PropTypes.bool.isRequired
}

export default Step1
