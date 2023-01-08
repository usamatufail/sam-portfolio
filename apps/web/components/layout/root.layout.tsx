import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Animated, Footer, Header } from '..';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouter().pathname;
  const isAbout = pathname.includes('/about/');
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Sam's Portfolio App"
        description="Sam is a full-stack web and mobile application
                developer with more than 4 years of work experience in this
                field. As a programmer, Sam is a skilled and knowledgeable
                individual with a passion for creating and improving softwares
                and solving problems. Sam is highly analytical, able to break
                down complex problems into manageable pieces and devise
                efficient solutions."
      />
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
