import '../css/style.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BYB</title>
      </Head>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
