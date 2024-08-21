import "./styles/globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Head>
          <title>Countries Map</title>
          <meta name="Countries Map" content="Information about countries" />
        </Head>
      </head>
      <body>{children}</body>
    </html>
  );
}
