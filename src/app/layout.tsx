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
