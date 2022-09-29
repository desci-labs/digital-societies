import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-bg h-screen overflow-y-scroll">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}