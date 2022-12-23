import './styles/globals.css';
import { Footer, Header } from '../components';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-[calc(100vh_-_128px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
