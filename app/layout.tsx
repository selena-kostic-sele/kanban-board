"use client";

import Modal from "@/components/Modal";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-[#F5F6F8]">
          {children}
          <Modal />
        </body>
      </html>
    </Provider>
  );
}
