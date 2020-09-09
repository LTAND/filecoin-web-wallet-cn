import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { theme, ThemeProvider } from '../components/Shared'
import withReduxStore from '../lib/with-redux-store'
import WalletProviderWrapper from '../WalletProvider'
import NetworkChecker from '../lib/check-network'
import BalancePoller from '../lib/update-balance'
import { ConverterWrapper } from '../lib/Converter'
import { WasmLoader } from '../lib/WasmLoader'
import ErrorBoundary from '../lib/ErrorBoundary'
import '../stylesheets/normalize.css'
import '../stylesheets/styles.css'
import { height } from 'styled-system'

class MyApp extends App {
  static getInitialProps({ ctx: { query, pathname } }) {
    return { query, pathname }
  }

  render() {
    const { Component, pageProps, reduxStore, query, pathname } = this.props
    const style_bg = {
      // backgroundColor:'red'
      background: "white",
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      // cursor: "url(../public/static/spacecraft.cur)",
    }
    const style_cont = {
      // background: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
      
    }
    return (
      <>
        <div style={style_bg}>

          <Head>
            <title>星际方舟</title>
          </Head>

          <Provider store={reduxStore}>
            <WasmLoader>

              <ConverterWrapper>

                <WalletProviderWrapper network={reduxStore.getState().network}>
                  <div style={style_cont}>
                    <NetworkChecker pathname={pathname} query={query} />

                    <BalancePoller />

                    <ThemeProvider theme={theme}>
                      {/* <ErrorBoundary> */}
                      <Component {...pageProps} />
                      {/* </ErrorBoundary> */}
                    </ThemeProvider>
                  </div>
                </WalletProviderWrapper>

              </ConverterWrapper>

            </WasmLoader>
          </Provider>

        </div>
      </>
    )
  }
}

export default withReduxStore(MyApp)
