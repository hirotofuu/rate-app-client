import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot, } from 'recoil';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3"
config.autoAddCss=false

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY ? process.env.NEXT_PUBLIC_RECAPCHA_SITE_KEY : ""}
      language="ja"
      >
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>  

      </GoogleReCaptchaProvider>
    </>
  )
}
