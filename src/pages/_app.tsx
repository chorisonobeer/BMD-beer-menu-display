import type { AppProps } from 'next/app'
import '../styles/globals.css'  // このインポートが重要

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}