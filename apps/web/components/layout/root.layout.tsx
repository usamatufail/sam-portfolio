import { Footer, Header } from '..';
import Head from 'next/head';
import { motion } from 'framer-motion';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Sam&apos;s Portfolio App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="min-h-[calc(100vh_-_128px)] overflow-hidden">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            {children}
          </motion.div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
