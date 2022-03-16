import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import theme from '../theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" style={{
        backgroundColor: "black"
      }}>
        <Head style={{
        backgroundColor: "black"
      }}>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link rel="shortcut icon" href="/icon.png" type= "image/png" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
        </Head>
        <body style={{
        backgroundColor: "black"
      }}>
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
 
  const initialProps = await Document.getInitialProps(ctx);
 
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}