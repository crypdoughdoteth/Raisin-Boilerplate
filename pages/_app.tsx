import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import dynamic from "next/dynamic";
import Navbar from '../components/Navbar';

const { chains, provider } = configureChains(
  [goerli],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

 function App({ Component, pageProps }: AppProps) {
  return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode theme={darkTheme({      
      accentColor: '#7b3fe4',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small',
      })}chains={chains}>
        <Navbar />
  <Component {...pageProps} />
  </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default dynamic (() => Promise.resolve(App), {ssr: false})
