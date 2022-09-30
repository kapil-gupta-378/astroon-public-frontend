import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { persistor, store } from '../src/redux/store';
import Layout from '../src/component/layout';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us
import ErrorFallback from '../src/component/common/error-fallback';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const rollbarConfig = {
  accessToken: publicRuntimeConfig.rollbarClientToken,
  environment: 'production',
};
function MyApp({ Component, pageProps }) {
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
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default MyApp;
