import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css';
import Container from 'react-bootstrap/Container';
import AppBar from 'components/commons/appBar';
import FooterColumn from 'components/commons/footerColumn';
import Footer from 'components/commons/footer';
import Head from 'next/head';
import { SSRProvider } from 'react-bootstrap';

export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <Head>
          <title>Vuokraus.fi</title>
          <meta name='description' content='Vuokraus.fi on Tori.fi kopio' />
          <meta name='theme-color' content='#fff' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <AppBar activeUser={pageProps.user} />
        <Container style={{ maxWidth: 800, paddingBottom: '4rem' }}>
          <Component {...pageProps} />
          <FooterColumn />
        </Container>
        <Footer />
      </div>
    </SSRProvider>
  );
}
