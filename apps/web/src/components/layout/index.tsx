import NetworkGuard from "components/Guards/NetworkGuard";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-bg h-screen overflow-y-scroll">
      <Header />
      <main>
        <NetworkGuard>{children}</NetworkGuard>
      </main>
      <Footer />
    </div>
  );
}
