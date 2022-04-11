import 'antd/dist/antd.css'; //import antd to use it in our app
import '../styles/style.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import {store} from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BYB</title>
      </Head>
      <Provider
        store={store}
      >
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
