import './styles/globals.css';
import { Header } from './components';
import Head from 'next/head';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Sam's Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
