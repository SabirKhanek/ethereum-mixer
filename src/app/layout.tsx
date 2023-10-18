import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import { MixerDetailsProvider } from "./shared/contexts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="ksHtd1aM4whzBNFYaw-uKSa2gZMTOZOY15LyzeR5b-s"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7WW9N9RLFK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7WW9N9RLFK');
            `,
          }}
        />
        <title>crypto-blender.com</title>
      </head>
      <body>
        <MixerDetailsProvider>
          <div id="root">{children}</div>
          <ToastContainer />
        </MixerDetailsProvider>

        <div id="modal-root"></div>
      </body>
    </html>
  );
}
