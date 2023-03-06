/* eslint-disable react/jsx-props-no-spreading */

import "react-querybuilder/dist/query-builder.css"
import "nextjs-breadcrumbs/dist/index.css"

import type {AppProps} from "next/app"
import {AuthProvider} from "context/auth-context"
import {Chakra} from "components/Chakra"
import {DefaultSeo} from "next-seo"
import Head from "next/head"
import Layout from "components/layout/Layout"
import {ProtectedApp} from "components/auth/ProtectedApp"
import {SetConfiguration} from "../services/ordercloud.service"
import {axiosService} from "services/axios.service"
import defaultSEOConfig from "../../next-seo.config"

axiosService.initializeInterceptors()
SetConfiguration()

const MyApp = ({Component, pageProps, ...appProps}: AppProps) => {
  if (appProps.router.pathname.startsWith("/docs")) return <Component {...pageProps} />

  return (
    <Chakra>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <AuthProvider>
        <ProtectedApp>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ProtectedApp>
      </AuthProvider>
    </Chakra>
  )
}

export default MyApp
