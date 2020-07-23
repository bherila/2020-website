import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="body-v3">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // For material UI @ https://developerhandbook.com/react/how-to-set-up-nextjs-material-ui/
  // Render app and page and get the context of the page with collected side effects.
  // const sheets = new ServerStyleSheets()
  // const originalRenderPage = ctx.renderPage
  // ctx.renderPage = () =>
  // 	originalRenderPage({
  // 		enhanceApp: App => props => sheets.collect(<App {...props} />)
  // 	})

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {/*{sheets.getStyleElement()} MATERIAL UI*/}
      </React.Fragment>,
    ],
  }
}

export default MyDocument
