import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css'
import { darkTheme } from '../themes';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)


  return( 
  <NextUIProvider theme={darkTheme}>
    {getLayout(<Component {...pageProps} />)}
  </NextUIProvider>
  );
}

export default MyApp
