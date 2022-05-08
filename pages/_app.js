import 'antd/dist/antd.css'; //import antd to use it in our app
import '../styles/style.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import {store} from '../store';

/*This is the main page of the front, that wraps the others */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BYB</title>
      </Head>
      {/*We need the Provider component to use our slicers from the redux toolkit */}
      <Provider
        store={store}
      >
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
