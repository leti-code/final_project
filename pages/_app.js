import 'antd/dist/antd.css'; //import antd to use it in our app
import '../styles/style.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store';

/*This is the main page of the front, that wraps the others */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='application-name' content='Break your Brain' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Break your Brain' />
        <meta name='description' content='A new application to play, create your own maps and play with the available ones' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        {/* <meta name='msapplication-config' content='/icons/browserconfig.xml' /> */}
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/images/icons/icon-512x512.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/images/icons/icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='192x192' href='/images/icons/icon-192x192.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/images/icons/icon-144x144.png' />

        <link rel='icon' type='image/png' sizes='32x32' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        {/* <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' /> */}
        <link rel='shortcut icon' href='/favicon.ico' />
        {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' /> */}

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://final-project-sandy.vercel.app/' />
        <meta name='twitter:title' content='ByB' />
        <meta name='twitter:description' content='Break your Brain' />
        <meta name='twitter:image' content='https://final-project-sandy.vercel.app/images/icons/icon-192x192.png' />
        <meta name='twitter:creator' content='@ByB' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='ByB' />
        <meta property='og:description' content='Best ByB in the world' />
        <meta property='og:site_name' content='ByB' />
        <meta property='og:url' content='https://final-project-sandy.vercel.app/' />
        <meta property='og:image' content='https://final-project-sandy.vercel.app/images/icons/icon-512x512.png' />

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
