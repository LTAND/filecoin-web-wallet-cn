import React from 'react'
import { ErrorView } from '../../components/Shared'

export default () => {
  return (
    <>
    <ErrorView
      title='糟糕! 出了些问题.'
      description="我们已收到有关该问题的通知."
      // linkDisplay='Follow @openworklabs for updates.'
      // linkhref='https://twitter.com/openworklabs'
    />
    </>
  )
}
