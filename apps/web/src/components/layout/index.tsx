import NetworkGuard from "components/Guards/NetworkGuard";
import Head from "next/head";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-bg h-screen overflow-y-scroll">
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
