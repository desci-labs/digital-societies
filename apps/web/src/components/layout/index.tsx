import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gradient-to-b from-rich-black to-black h-screen overflow-y-scroll">
      <Header />
      <main>{children}</main>
    </div>
  )
}