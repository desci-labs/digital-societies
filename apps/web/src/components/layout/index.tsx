import NetworkGuard from "components/Guards/NetworkGuard";
import { useLayoutContext } from "hooks/usePageScroll";
import Head from "next/head";
import { PropsWithChildren, useCallback } from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  const { setRoot } = useLayoutContext();

  const handleRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setRoot(node);
      }
    },
    [setRoot]
  );

  return (
    <div className="app-bg h-screen overflow-y-scroll" ref={handleRef}>
      <Head>
        <title>Deciety</title>
        <meta
          name="description"
          content="Deciety | Tooling for Desoc by Desci Labs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <NetworkGuard>{children}</NetworkGuard>
      </main>
      <Footer />
    </div>
  );
}
