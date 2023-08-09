import '../styles/global.css';
import Script from "next/script"

export default function App({ Component, pageProps }) {
  return (
    <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-WEX6FW6EN4"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WEX6FW6EN4', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
    <Component {...pageProps} />
    </>
  ) 
}