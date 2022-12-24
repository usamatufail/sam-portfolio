import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}
