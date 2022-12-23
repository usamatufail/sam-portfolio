import { Footer, Header } from '..';
import Head from 'next/head';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Sam&apos;s Portfolio App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="min-h-[calc(100vh_-_128px)]">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
