import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";
import Head from "next/head";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <section className={styles.container}>
            <Nav />

            <main className={`${styles.main} `}>{children}</main>


          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
