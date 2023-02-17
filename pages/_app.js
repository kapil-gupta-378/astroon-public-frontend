import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { persistor, store } from '../src/redux/store';
import Layout from '../src/component/layout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us
import ErrorFallback from '../src/component/common/error-fallback';
import getConfig from 'next/config';
import 'react-toastify/dist/ReactToastify.css';
import { chains, providers } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import 'rc-slider/assets/index.css';

import {
  requestInterceptor,
  responseInterceptor,
} from '../services/interceptor';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
const { publicRuntimeConfig } = getConfig();
const rollbarConfig = {
  accessToken: publicRuntimeConfig.rollbarClientToken,
  environment: 'production',
};
function MyApp({ Component, pageProps }) {
  const route = useRouter();
  // Configure web3modal
  const modalConfig = {
    projectId: process.env.NEXT_PUBLIC_WEB3_MODAL_ID,
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'Astroon',
      chains: [chains.goerli],
      providers: [
        providers.walletConnectProvider({
          projectId: process.env.NEXT_PUBLIC_WEB3_MODAL_ID,
        }),
      ],
    },
  };

  useEffect(() => {
    requestInterceptor(route);
    responseInterceptor(route);
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={ErrorFallback}
        errorMessage="Error in React render"
        extra={(error, info) =>
          info.componentStack.includes('Experimental')
            ? { experiment: true }
            : {}
        }
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Web3Modal config={modalConfig} />
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default MyApp;
