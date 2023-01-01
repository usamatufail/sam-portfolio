import Head from 'next/head';
import { useRouter } from 'next/router';
import { Animated, Footer, Header } from '..';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouter().pathname;
  const isAbout = pathname.includes('/about/');
  return (
    <div>
      <Head>
        <title>Sam&apos;s Portfolio App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="min-h-[calc(100vh_-_130px)] overflow-hidden">
          {isAbout ? children : <Animated>{children}</Animated>}
        </div>
        <Footer />
      </main>
    </div>
  );
}
